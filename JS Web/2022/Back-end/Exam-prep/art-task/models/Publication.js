const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    paintingTechnique: {
        type: String,
        required: true
    },
    artPicture: {
        type: String,
        required: true
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