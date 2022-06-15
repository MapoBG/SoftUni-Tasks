const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const { secret, saltRounds } = require("../config/hash");

exports.createUser = async (userInfo) => {
    console.log(userInfo);
    userInfo.password = await bcrypt.hash(userInfo.password, saltRounds);

    User.create(userInfo);
}