const dbConnect = require("./Database");
let DatabaseName = 'BookStore';
let collectionName = 'admin'

const findAdmin = async (req,res) =>{

    try{
        const client = await dbConnect();
        const db = client.db(DatabaseName);
        console.log("Database:", db);
        let collection = db.collection(collectionName);
        const result = await collection.find().toArray(); 
        console.log("Data: ", result);

        return {
            statusCode: 200,
          
            body: result
        };
    }
    catch(error)
    {
        console.error('Error', error);
        return {
            statusCode: 500,
            body: error.message
        };
    }

};

module.exports = findAdmin;