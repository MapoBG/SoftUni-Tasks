const { getOne } = require("../services/-publicationsServices-");


exports.preloadPublication = async (req, res, next) => {
    const publication = await getOne(req.params.publicationId);

    req.publication = publication;

    next();
}