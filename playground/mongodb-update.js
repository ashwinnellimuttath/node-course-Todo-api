const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    if (err) {
        console.log('Unable to Connect');
    } else {
        console.log('Connected to mongodb server');
        const db = client.db('TodoApp');

        db.collection('User').findOneAndUpdate({
            _id: new ObjectID("5bb08c1813c47b0f10963a9c")
        }, {
            $set: {
                name: "Achu"
            },
            $inc: {
                age: -2
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        })
        // client.close();
    }
});