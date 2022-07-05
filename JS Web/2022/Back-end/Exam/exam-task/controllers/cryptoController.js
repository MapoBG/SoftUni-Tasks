const cryptoController = require('express').Router();

const { isAuth } = require('../middlewares/userMiddleware');
const { getAll, createCrypto, getOneDetailed } = require('../services/cryptoServices');


cryptoController.get('/create', isAuth, (req, res) => res.render('crypto/create'));

cryptoController.post('/create', isAuth, async (req, res) => {
    const cryptoData = { ...req.body, owner: req.user._id };

    try {
        await createCrypto(cryptoData);

        res.redirect('/crypto/catalog');
    } catch (error) {
        res.locals.errors = [error.message];
        res.render('crypto/create', { cryptoData });
    }
});

cryptoController.get('/catalog', async (req, res) => {
    try {
        const cryptoOffers = await getAll().lean();

        res.render('crypto/catalog', { cryptoOffers });
    } catch (error) {
        // res.locals.errors = [error.message];
        res.render('user/404');
    }
});

cryptoController.get('/details/:cryptoId', async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const currentUser = req.user?._id;

    try {
        const crypto = await getOneDetailed(cryptoId).lean();

        crypto.isOwner = crypto.owner._id == currentUser;
        crypto.alreadyBought = crypto.buyers.find(x => x._id == currentUser);

        res.render('crypto/details', crypto);
    } catch (error) {
        res.locals.errors = [error.message];
        res.render('user/404');
    }
});

module.exports = cryptoController;