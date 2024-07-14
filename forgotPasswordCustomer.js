const dbConnect = require("./Database");
const { generateTokens } = require('./jwtUtilsCustomer');
const sendMail = require('./nodeMailer');

const forgotPasswordCustomer = async (req, res) => {
    try {
        const { Email } = req.body;
        if (!Email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const client = await dbConnect();
        const db = client.db('BookStore');
        const collection = db.collection('customer');
        const customer = await collection.findOne({ Email });

        if (!customer) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const token = generateTokens(customer.Email);
        const resetLink = token;

        const mailOptions = {
            to: customer.Email,
            subject: 'Password Reset',
            html:resetLink
                   
        };

        await sendMail(mailOptions.to, mailOptions.subject, mailOptions.html);

        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = forgotPasswordCustomer;
