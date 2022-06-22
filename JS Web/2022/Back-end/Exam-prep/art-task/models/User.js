const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    myPublications: {
        type: mongoose.Types.ObjectId,
        ref: 'Publication'
    }
});

module.exports = User = mongoose.model('User', userShema);