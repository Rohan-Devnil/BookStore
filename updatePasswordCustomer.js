const dbConnect = require("./Database");
const bcrypt = require('bcryptjs');

const updatePasswordCustomer = async (req, res) => {
    try {
        const { Email, newPassword } = req.body;
        if (!Email || !newPassword) {
            return res.status(400).json({ message: 'Email and new password are required' });
        }

        const client = await dbConnect();
        const db = client.db('BookStore');
        const collection = db.collection('customer');

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await collection.updateOne({ Email }, { $set: { Password: hashedPassword } });

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = updatePasswordCustomer;
