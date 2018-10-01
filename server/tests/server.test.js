const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');


const todo = [{
    _id: new ObjectId(),
    text: "First test"
},
{   
    _id: new ObjectId(),
    text: "second test"
}]
beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todo);
    }).then(() => done());
});

describe('Post/Todos', () => {
    it('Should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    console.log('error');
                    return done(err);
                }

                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            })
    });

    it('Should no create todo with invalid body', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('POST/todos', () => {
    it("Should return a get request", (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2)
        })
        .end(done)
    });
});

describe('GET/todos/:id', () => {
    it('SHould return a get request with id', (done) => {
        request(app)
        .get(`/todos/${todo[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todo[0].text);
        })
        .end(done);
    });

    it('Should return 404 if todo not found', (done) => {
        const hexId = new ObjectId().toHexString();
        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('Should return 404 for non ojectIds', (done) => {
        request(app)
        .get(`/todos/123`)
        .expect(404)
        .end(done);
    })
});