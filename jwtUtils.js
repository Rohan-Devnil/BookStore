
const addUser = require("./addAdmin");
const jwt = require('jsonwebtoken');
const secretKey = 'admin@1234';

const generateToken = (Email) => {
    return jwt.sign(
        { Email: Email },
        secretKey,
        { expiresIn: '1h' }
    );
};

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token)
        {
            return{
                statusCode: 404,
                body: 'Unvalid Token'
            };
        } 

    try{
        const decoded = jwt.verify(token, secretkey)
        req.user = decoded;
        next();
    }
    catch(err){

        console.error(err)
        req.status(401).json({err:'Invalid token'})

    }

};

module.exports = {authenticateToken, generateToken};
