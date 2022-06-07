const mongoose = require("mongoose");

const accShema = new mongoose.Schema({
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
});

module.exports = Accessory = mongoose.model('Accessory', accShema);