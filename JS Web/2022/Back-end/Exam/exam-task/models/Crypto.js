const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required and should be at least two characters long'],
        minLength: [2, 'Name should be at least two characters long'],
    },
    image: {
        type: String,
        required: [true, 'Image link is required'],
        match: /^https?:\/\//
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [1, 'Price should be a positive number']
    },
    description: {
        type: String,
        required: [true, 'Description is required and should be at least 10 characters long'],
        minLength: [10, 'Description should be at least 10 characters long']
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal']
    },
    buyers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Crypto = mongoose.model('Crypto', cryptoSchema);