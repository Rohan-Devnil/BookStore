const dbConnect = require('./Database');
let DatabaseName = 'BookStore';
let collectionName = 'admin';
const bcrypt = require('bcryptjs');


const admin = async (req) => {
    try {
        const { FirstName, LastName, Email, Password, Mobile_No } = req;
        if(!FirstName|| !LastName|| !Email|| !Password|| !Mobile_No)
            {
                return{
                    statusCode:400,
                    body: 'Invalid request: FirstName, LastName, Email, Password, Mobile_No is required'

                }
            }
        const client = await dbConnect();
        const db = client.db(DatabaseName);
        let collection = db.collection(collectionName);
        

        const existingAdmin = await collection.findOne({ Email: Email });
        if (existingAdmin) {
            return {
                statusCode: 400,
                body: 'This name Admin already exists. Please try with a different Email.'
            };
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const result = await collection.insertOne(
            {
                FirstName: FirstName,
                LastName: LastName,
                Email: Email,
                Password: hashedPassword,
                Mobile_No: Mobile_No
            }
        );

         console.log('Data inserted', result);
        return {
            statusCode: 200,
            body: 'Admin added successfully'
        };
    } catch (error) {
        console.error('Error inserting data', error);
        return {
            statusCode: 500,
            body: error.message
        };
    }
};

module.exports = admin;