const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

const {mongoose} = require('./db/mongoose.js')
const {Todo} =require('./models/todo');
const {User} =require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
    console.log(req.body,'body');
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        res.status(404).send();
    } else {
        Todo.findById(id).then((todo) => {
            if(!todo) {
                console.log('Not found');
                res.status(404).send();
            } else {
                res.send({todo});
            }
        }, (e) => {
            res.status(400).send();
        })
    }
})

app.listen(3000, () => {
    console.log('Port started');
})

module.exports = {app};