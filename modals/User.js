const mongoose = require('mongoose');

const  user = new mongoose.Schema ({
  
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
})

const User = mongoose.model('User', user);

module.exports = User;