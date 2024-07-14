const dbConnect = require('./Database');
let DatabaseName = 'BookStore';
let booksCollectionName = 'book';
let customer = 'customer';
let purchasesCollectionName = 'purchases';

const purchaseBook = async (req) => {
    try {
        const { BookName, Quantity, CustomerEmail } = req;
        if (!BookName || !Quantity || !CustomerEmail) {
            return {
                statusCode: 400,
                body: 'Invalid request: BookName, Quantity, and CustomerEmail are required'
            };
        }

        const client = await dbConnect();
        const db = client.db(DatabaseName);
        let booksCollection = db.collection(booksCollectionName);
        let purchasesCollection = db.collection(purchasesCollectionName);

        const book = await booksCollection.findOne({ BookName: BookName });
        if (!book) {
            return {
                statusCode: 404,
                body: 'Book not found'
            };
        }

        if (book.Quantity < Quantity) {
            return {
                statusCode: 400,
                body: 'Not enough books in stock'
            };
        }

        // Update the book quantity
        await booksCollection.updateOne(
            { BookName: BookName },
            { $inc: { Quantity: -Quantity } }
        );

        // Log the purchase
        const purchase = {
            BookName,
            Quantity,
            CustomerEmail,
            PurchaseDate: new Date()
        };
        await purchasesCollection.insertOne(purchase);

        console.log('Purchase logged', purchase);
        return {
            statusCode: 200,
            body: 'Book purchased successfully'
        };
    } catch (error) {
        console.error('Error processing purchase', error);
        return {
            statusCode: 500,
            body: error.message
        };
    }
};

module.exports = purchaseBook;
