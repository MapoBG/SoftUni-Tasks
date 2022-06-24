const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [6, 'Title should be at least 6 characters long']
    },
    paintingTechnique: {
        type: String,
        required: true,
        maxLength: [15, 'Painting technique should be max 15 characters long']
    },
    picture: {
        type: String,
        required: true,
        match: /^https?:\/\//
    },
    certificate: {
        type: String,
        required: true,
        enum: ['Yes', 'No']       //default values
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