const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'webbshop';
const dbcol = 'candy';

const settings = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

MongoClient.connect(url, settings, (error, client) => {
    if (err) {
        console.error('Add files error: ', error);
        throw err;
    }

    let collection = client.db(dbName).collection(dbcol);
    let allCandies = [];

    function generateCandies() {
        const color = ['red', 'blue', 'pink', 'violet', 'green', 'yellow', 'orange', 'black'];
        const name = ['cherry', 'strawberry', 'orange', 'lemon', 'peach', 'grape', 'pear', 'apple', 'raspeberry'];
        const category = ['ball', 'chewing gum', 'candy', 'bar', 'fudge', 'chocolate'];
        const price = Math.floor(Math.random() * 100) / 10;

        function randomCandy(list) {
            let r = Math.random() * list.length;
            return list[Math.floor(r)];
        }

        let c = randomCandy(color);
        let n = randomCandy(name);
        let k = randomCandy(category);
        let p = price;

        return {
            name: `${c} ${n} ${k}`,
            category: k,
            price: p
        };

    }

    for (let i = 0; i < 1000000; i++) {
        allCandies.push(generateCandies());
    }

    collection.insertMany(allCandies, (error, result) => {
        if (error) {
            console.error('Could not insert', error);
            throw error;
        }
        //console.log('Inserted new documents:', result);
        client.close();
    })

});