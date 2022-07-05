const { getOne } = require("../services/cryptoServices");


exports.preloadCrypto = async (req, res, next) => {
    const crypto = await getOne(req.params.cryptoId);

    req.crypto = crypto;

    next();
}