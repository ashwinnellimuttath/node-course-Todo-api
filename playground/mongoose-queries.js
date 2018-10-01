const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '6bb1f5c8aac2c333eca19158';
// if(!ObjectId.isValid(id)) {
//     console.log('Id ot valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('todos', todos);
// })

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('todo', todo);
// })

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//       return console.log('No such id');
//     }
//     console.log('Find by id', todo);
// }).catch((e) => console.log(e));

var userId = '5bb10f06bf9dba3cf4649fc9';

User.findById(userId).then((user) => {
    if (!user) {
        return console.log('No such user id');
    }
        console.log('User', user)
}).catch((e) => console.log(e));