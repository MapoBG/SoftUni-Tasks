const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required and should be at least five characters long'],
        minLength: [5, 'Username should be at least five characters long'],
    },
    email: {
        type: String,
        required: [true, 'Email is required and should be at least 10 characters long'],
        minLength: [10, 'Email should be at least 10 characters long'],
    },
    password: {
        type: String,
        required: [true, 'Password is required and should be at least 4 char long'],
        minLength: [4, 'Password should be at least 4 characters long'],
    }
});

module.exports = User = mongoose.model('User', userShema);