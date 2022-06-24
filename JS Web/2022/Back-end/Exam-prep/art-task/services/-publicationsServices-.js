const Publication = require('../models/Publication');

exports.createPublication = async (publicationData) => Publication.create(publicationData);

exports.getAll = () => Publication.find();

exports.getOne = (publicationId) => Publication.findById(publicationId);

exports.getOneDetailed = (publicationId) => Publication.findById(publicationId).populate('author');

exports.sharePublication = (publicationId, userId) => Publication.findByIdAndUpdate(publicationId, { $push: { sharedBy: userId } });

exports.deletePublication = (publicationId) => Publication.findByIdAndDelete(publicationId);

exports.updatePublication = (publicationId, publicationData) => Publication.findByIdAndUpdate(publicationId, publicationData, { runValidators: true });