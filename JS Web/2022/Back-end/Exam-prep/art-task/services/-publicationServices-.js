const Publication = require('../models/Publication');

exports.createPublication = async (publicationData) => Publication.create(publicationData);

exports.getAll = () => Publication.find();