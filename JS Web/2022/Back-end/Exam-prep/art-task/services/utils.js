const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { secret, saltRounds } = require('../config/env');

exports.createToken = async (newUser) => {
    const token = jwt.sign({ _id: newUser._id, username: newUser.username }, secret, { expiresIn: '1d' });     //this is sync func by design...

    return token;
};

exports.hashPassword = (password) => {
    const hashedPassword = bcrypt.hash(password, saltRounds);

    return hashedPassword;
};

exports.resetValues = (result) => {
    result.isValid = true;
    result.msgs = [];
}