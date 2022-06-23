const mongoose = require('mongoose');
const { pathDB } = require('../config/env');

module.exports = () => mongoose.connect(pathDB);