const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    if (err) {
        console.log('Unable to Connect');
    } else {
        console.log('Connected to mongodb server');
        const db = client.db('TodoApp');

        // db.collection('Todos').deleteOne({text: "Eat lunch"}).then((result) => {
        //     console.log(result);
        // })

        db.collection('User').deleteMany({name: "Andrew"}).then((result) => {
            console.log(result);
        })

        // db.collection('User').findOneAndDelete({_id: new ObjectID("5bb0dfd062875e026d477422")}).then((res) => {
        //     console.log(res);
        // })
        // client.close();
    }
});