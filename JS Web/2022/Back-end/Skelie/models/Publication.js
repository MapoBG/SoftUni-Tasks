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
        type: String,       //default values???
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    sharedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})