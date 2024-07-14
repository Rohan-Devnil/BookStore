
const customer = require('./addCustomer');
const jwt = require('jsonwebtoken');
const secretKeyCustomer = 'customer@1234';

const generateTokens = (Email) => {
    return jwt.sign(
        { Email: Email },
        secretKeyCustomer,
        { expiresIn: '1h' }
    );
};

const authenticateTokens = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token)
        {
            return{
                statusCode: 404,
                body: 'Unvalid Token'
            };
        } 

    try{
        const decoded = jwt.verify(token, secretKeyCustomer)
        req.user = decoded;
        next();
    }
    catch(err){

        console.error(err)
        req.status(401).json({err:'Invalid token'})

    }

};

module.exports = {authenticateTokens, generateTokens};
