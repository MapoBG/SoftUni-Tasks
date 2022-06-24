const Publication = require('../models/Publication');

exports.createPublication = async (publicationData) => Publication.create(publicationData);

exports.getAll = () => Publication.find();

exports.getOne = (publicationId) => Publication.findById(publicationId).populate('author');