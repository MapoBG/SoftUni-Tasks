const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { saltRounds } = require('../config/env');

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required and should be at least 4 characters long'],
        minLength: [4, 'Username should be at least 4 characters long'],
        // unique: [true, 'Username is already in use']
    },
    password: {
        type: String,
        required: [true, 'Password is required and should be at least 3 char long'],
        minLength: [3, 'Password should be at least 3 characters long'],
    },
    address: {
        type: String,
        required: [true, 'Address is required and should be maximum 20 characters long'],
        maxLength: [20, 'Address should be no more than 20 characters long']
    },
    myPublications: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Publication'
        }
    ]
});

userShema.pre('save', function (next) {           // use this to hash pwrd in Model before saving it in the DB 
    bcrypt.hash(this.password, saltRounds)
        .then(hashedPassword => {
            this.password = hashedPassword;
            next();
        })
        .catch(err => console.log(err));
});

module.exports = User = mongoose.model('User', userShema);