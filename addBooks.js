const dbConnect = require('./Database');
let DatabaseName = 'BookStore';
let collectionName = 'book';



const book = async (req) => {
    try {
        const {BookName, Publication, AuthorName, Quantity, Price } = req;
        if(!BookName|| !Publication|| !AuthorName|| !Quantity|| !Price )
            {
                return{
                    statusCode:400,
                    body: 'Invalid request: BookName, Publication, AuthorName, Quantity, Price is required'

                }
            }
        const client = await dbConnect();
        const db = client.db(DatabaseName);
        let collection = db.collection(collectionName);
        

        const existingBook = await collection.findOne({ BookName: BookName });
        if (existingBook) {
            return {
                statusCode: 400,
                body: 'Book already exists.'
            };
        }

        const result = await collection.insertOne(
            {
                BookName: BookName,
                Publication: Publication,
                AuthorName: AuthorName,
                Quantity: Quantity,
                Price: Price
            }
        );

         console.log('Data inserted', result);
        return {
            statusCode: 200,
            body: 'Book added successfully'
        };
    } catch (error) {
        console.error('Error inserting data', error);
        return {
            statusCode: 500,
            body: error.message
        };
    }
};

module.exports = book;