const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const { secret, saltRounds } = require("../config/hash");

exports.createUser = async ({ username, password, repeatPassword }) => {

    if (password !== repeatPassword) {
        return false;
    }

    password = await bcrypt.hash(password, saltRounds);

    return User.create({ username, password });
};

exports.loginUser = async ({ username, password }) => {
    const user = await User.findOne({ username });

    if (!user) {
        return false;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return false;
    }

    const token = jwt.sign({ _id: user._id, username: user.username }, secret, { expiresIn: "1d" });
};