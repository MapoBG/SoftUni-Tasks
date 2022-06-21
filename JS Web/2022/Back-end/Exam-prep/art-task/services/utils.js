const jwt = require('jsonwebtoken');
const { secret } = require('../config/env');

exports.createToken = (newUser) => {
    const token = jwt.sign({ _id: newUser._id, username: newUser.username }, secret, { expiresIn: '1d' });     //this is sync func by design...

    return token;
};