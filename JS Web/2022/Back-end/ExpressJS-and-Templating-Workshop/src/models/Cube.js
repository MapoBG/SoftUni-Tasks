const mongoose = require("mongoose");

const cubeShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 200
    },
    imageUrl: {
        type: String,
        required: true,
        match: /^http/
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Accessory"
        }
    ],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
});

module.exports = Cube = mongoose.model('Cube', cubeShema);