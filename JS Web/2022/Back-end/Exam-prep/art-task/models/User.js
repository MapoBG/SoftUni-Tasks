const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { saltRounds } = require('../config/env');

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required and should be at least 4 characters long'],
        min: 4,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required and should be at least 3 char long'],
        min: 3
    },
    address: {
        type: String,
        required: [true, 'Address is required and should be maximum 20 characters long'],
        max: 20
    },
    myPublications: {
        type: mongoose.Types.ObjectId,
        ref: 'Publication'
    }
});

userShema.pre('save', function (next) {           // use this to check pwrd & repwrd before hash
    bcrypt.hash(this.password, saltRounds)
        .then(hashedPassword => {
            this.password = hashedPassword;
            next();
        })
        .catch(err => err);
});

module.exports = User = mongoose.model('User', userShema);