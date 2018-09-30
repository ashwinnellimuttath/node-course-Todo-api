const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    if (err) {
        console.log('Unable to Connect');
    } else {
        console.log('Connected to mongodb server');
        const db = client.db('TodoApp');

        // db.collection('Todos').insertOne({
        //     text: 'Something to do',
        //     completed: false
        // }, (err, result) => {
        //     if (err) {
        //         console.log('Error', err)
        //     } else {
        //         console.log(JSON.stringify(result, undefined, 2))
        //     }
        // });

        db.collection('User').insertOne({
            name:'Ashwin',
            age: 22,
            location: 'Ijk'
        }, function(err, result) {
            if (err) {
                console.log('error', err);
            } else {
                console.log(JSON.stringify(result));
            }
        })
        client.close();
    }
});