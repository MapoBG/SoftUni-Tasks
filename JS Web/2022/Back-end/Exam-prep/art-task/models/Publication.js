const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required and should be at least 6 characters long'],
        minLength: [6, 'Title should be at least 6 characters long']
    },
    paintingTechnique: {
        type: String,
        required: [true, '"Painting technique" is required and should be no more than 15 characters long'],
        maxLength: [15, 'Painting technique should be max 15 characters long']
    },
    picture: {
        type: String,
        required: [true, 'Picture link is required'],
        match: /^https?:\/\//
    },
    certificate: {
        type: String,
        required: [true, 'Certificate is required'],
        enum: {                                     //default values
            values: ['Yes', 'No'],
            message: 'Certificate should be either "Yes" or "No"'
        }
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    sharedBy: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]
});

module.exports = Publication = mongoose.model('Publication', publicationSchema);