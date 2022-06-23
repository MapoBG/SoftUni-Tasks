const User = require('../models/User');
// const { hashPassword } = require('./utils');

exports.createUser = async (userData) => {
    // userData.password = await hashPassword(userData.password);       //it's done in User model
    const newUser = await User.create(userData);

    return newUser;
};

exports.getUser = async ( username ) => {
    const user = await User.findOne({ username });

    return user;
};