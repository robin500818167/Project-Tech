const mongoose = require('mongoose');

const  user = new mongoose.Schema ({
    indentifier: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    level: {
        type: Array,
        required: true
    }
})

const User = mongoose.model('User', user);

module.exports = User;