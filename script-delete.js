const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'webbshop';
const dbcol = 'candy';

const settings = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

MongoClient.connect(url, settings, (error, client) => {
    if (error) {
        console.error('Delete collection files error: ', error);
        throw error;
    }

    let collection = client.db(dbName).collection(dbcol);

    collection.deleteMany({}, (error, result) => {
        if (error) {
            console.error('Couldnt delete: ', error);
            throw error;
        }
        console.log('Success! Files deleted :) ');
    });

    client.close();
});