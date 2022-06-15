const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model("User", userShema);