const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Todo = require('../../models/Todo');

router.get('/', (req, res) => {
    Todo.find()
        .then(todos => res.json(todos))
});

router.get('/:search', (req, res) => {
    Todo.find({$or: [{"country": {$regex: new RegExp(req.params.search, "i")}},
                     {"city": {$regex: new RegExp(req.params.search, "i")}},
                     {"place": {$regex: new RegExp(req.params.search, "i")}},
                     {"desc": {$regex: new RegExp(req.params.search, "i")}}]})
        .then(todos => res.json(todos))
});

router.post('/', auth, (req, res) => {
    const newTodo = new Todo({
        country: req.body.country,
        city: req.body.city,
        place: req.body.place,
        desc: req.body.desc,
        imgUrl: req.body.imgUrl,
        email: req.body.email
    });

    newTodo.save().then(todo => res.json(todo));
});

router.delete('/:id', auth, (req, res) => {
    Todo.findById(req.params.id)
        .then(todo => todo.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;

