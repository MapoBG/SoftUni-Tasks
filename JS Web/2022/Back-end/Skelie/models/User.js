const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required and should be at least 4 characters long'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required and should be at least 3 char long']
    },
    address: {
        type: String,
        required: [true, 'Address is required and should be maximum 20 characters long']
    },
    myPublications: {
        type: mongoose.Types.ObjectId,
        ref: 'Publication'
    }
});

// userShema.pre('save') // use this to check pwrd & repwrd before hash

module.exports = User = mongoose.model('User', userShema);