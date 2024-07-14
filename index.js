const express = require('express');
const dbConnect = require('./Database');
const bcrypt = require('bcryptjs');
const admin = require('./addAdmin');
const findAdmin = require('./find');
const loginAdmin = require('./adminLogin');
const { authenticateToken, generateToken } = require('./jwtUtils');
const sendMail = require('./nodeMailer');
const forgotPassword = require('./forgotPassword');
const resetPassword = require('./resetPassword');
const updatePassword = require('./updatePassword');
const customer = require('./addCustomer');
const findCustomer = require('./findCustomer');
const findBook = require('./findBook');
const loginCustomer = require('./customerLogin');
const forgotPasswordCustomer = require('./forgotPasswordCustomer');
const resetPasswordCustomer = require('./resetPasswordCustomer');
const updatePasswordCustomer = require('./updatePasswordCustomer');
const { authenticateTokens, generateTokens } = require('./jwtUtilsCustomer');
const purchaseBook = require('./purchaseBook');
const book = require('./addBooks');

const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const app = express();
app.use(express.json());

dbConnect();

const responseHandler = (res, data) => {
  res.status(data.statusCode).json(data.body);
};

app.post('/addAdmin', asyncHandler(async (req, res) => {
  let data = await admin(req.body);
  responseHandler(res, data);
}));

app.get('/getAdmins', asyncHandler(async (req, res) => {
  const data = await findAdmin(req.query);
  responseHandler(res, data);
}));



app.get('/getAdmin', asyncHandler(async (req, res) => {
  const { Email } = req.body;
  if (!Email) {
    return res.status(400).json({
      statusCode: 400,
      body: 'Email is required'
    });
  }
  
  const client = await dbConnect();
  const db = client.db('BookStore');
  let collection = db.collection('admin');
  const data = await collection.findOne({ Email });

  if (!data) {
    return res.status(404).json({
      statusCode: 404,
      body: 'Admin not found'
    });
  }

  res.status(200).json(data);
}));

app.post('/login', asyncHandler(async (req, res) => {
  const data = await loginAdmin(req, res);
  responseHandler(res, data);
}));

app.post('/forgotPassword', forgotPassword);
app.get('/resetPassword', resetPassword);
app.post('/updatePassword', updatePassword);

// Customer Routes

app.post('/addCustomer', asyncHandler(async (req, res) => {
  let data = await customer(req.body);
  responseHandler(res, data);
}));

app.get('/getCustomers', asyncHandler(async (req, res) => {
  const data = await findCustomer(req.body);
  responseHandler(res, data);
}));

app.get('/getCustomer', asyncHandler(async (req, res) => {
  const { Email } = req.body;
  if (!Email) {
    return res.status(400).json({
      statusCode: 400,
      body: 'Email is required'
    });
  }

  const client = await dbConnect();
  const db = client.db('BookStore');
  let collection = db.collection('customer');
  const data = await collection.findOne({ Email });

  if (!data) {
    return res.status(404).json({
      statusCode: 404,
      body: 'Customer not found'
    });
  }

  res.status(200).json(data);
}));

app.post('/loginCustomer', asyncHandler(async (req, res) => {
  const data = await loginCustomer(req, res);
  responseHandler(res, data);
}));

app.post('/forgotPasswordCustomer', forgotPasswordCustomer);
app.get('/resetPasswordCustomer', resetPasswordCustomer);
app.post('/updatePasswordCustomer', updatePasswordCustomer);

// Book Routes

app.post('/addBook', asyncHandler(async (req, res) => {
  let data = await book(req.body);
  responseHandler(res, data);
}));

app.get('/getBooks', asyncHandler(async (req, res) => {
  const data = await findBook(req.body);
  responseHandler(res, data);
}));

app.get('/getBook', asyncHandler(async (req, res) => {
  const {BookName} = req.body;
  if (!BookName) {
    return res.status(400).json({
      statusCode: 400,
      body: 'BookName is required'
    });
  }

  const client = await dbConnect();
  const db = client.db('BookStore');
  let collection = db.collection('book');
  const data = await collection.findOne({BookName});

  if (!data) {
    return res.status(404).json({
      statusCode: 404,
      body: 'Book not available'
    });
  }

  res.status(200).json(data);
}));

app.post('/purchaseBook', asyncHandler(async (req, res) => {
  const result = await purchaseBook(req.body);
  responseHandler(res, result);
}));

const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
