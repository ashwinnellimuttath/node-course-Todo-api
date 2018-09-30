const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    if (err) {
        console.log('Unable to Connect');
    } else {
        console.log('Connected to mongodb server');
        const db = client.db('TodoApp');

        // db.collection('Todos').find({
        //     _id: new ObjectID('5bb08a190c25c335a4b0b52e')
        // }).toArray().then((docs) => {
        //     console.log('Todos');
        //     console.log(JSON.stringify(docs, undefined, 2));
        // }, (err) => {
        //     console.log('Unable to fetch date',err);
        // });

        db.collection('Todos').find().count().then((count) => {
            console.log(`Todos count: ${count}`);
        }, (err) => {
            console.log('Unable to fetch date',err);
        });


        client.close();
    }
});