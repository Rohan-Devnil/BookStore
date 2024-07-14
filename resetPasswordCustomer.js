const jwt = require('jsonwebtoken');
const secretKeyCustomer = 'customer@1234';

const resetPasswordCustomer = (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        jwt.verify(token, secretKeyCustomer, (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: 'Invalid or expired token' });
            }

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

module.exports = resetPasswordCustomer ;
