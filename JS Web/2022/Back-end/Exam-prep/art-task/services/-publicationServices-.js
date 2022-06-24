const Publication = require('../models/Publication');

exports.createPublication = async (publicationData) => {
    const newPublication = await Publication.create(publicationData);

    return newPublication;
};