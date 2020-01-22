const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
});

module.exports = Todo = mongoose.model('todo', TodoSchema);

