const bcrypt = require('bcrypt');
const { saltRounds } = require('../config/env');

const User = require('../models/User');

exports.create = async (userData) => {
    userData.password = await bcrypt.hash(userData.password, saltRounds);

    const newUser = await User.create(userData);

    return newUser;
}