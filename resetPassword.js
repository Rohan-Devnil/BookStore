const jwt = require('jsonwebtoken');
const secretKey = 'admin@1234';

const resetPassword = (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: 'Invalid or expired token' });
            }
                                                                        //${decoded.Email}--> Change userId to Email
            res.send(`<form action="/updatePassword" method="POST">
                        <input type="hidden" name="userId" value="${decoded.Email}" />  
                        <input type="password" name="newPassword" placeholder="New Password" required />
                        <button type="submit">Reset Password</button>
                      </form>`);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = resetPassword;
