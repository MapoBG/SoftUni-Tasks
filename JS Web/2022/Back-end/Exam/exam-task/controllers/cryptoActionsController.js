const cryptoActionsRouter = require('express').Router();

const { preloadCrypto } = require('../middlewares/cryptoMiddleware');
const { isAuth } = require('../middlewares/userMiddleware');
const { buyCrypto, deleteCrypto, updateCrypto, getOneWithOptions } = require('../services/cryptoServices');
const { isCorrectBuyer, isCorrectUser } = require('../services/userValidators');


cryptoActionsRouter.use(isAuth);

cryptoActionsRouter.get('/buy/:cryptoId', preloadCrypto, async (req, res) => {
    const cryptoId = req.params.cryptoId;

    try {
        isCorrectBuyer(req.user._id, req.crypto.owner);

        await buyCrypto(cryptoId, req.user._id);

        res.redirect(`/crypto/details/${cryptoId}`);
    } catch (error) {
        // res.locals.errors = [error.message];
        res.render('user/404');
    }
});

cryptoActionsRouter.get('/delete/:cryptoId', preloadCrypto, async (req, res) => {
    try {
        isCorrectUser(req.user._id, req.crypto.owner);

        await deleteCrypto(req.params.cryptoId);

        res.redirect('/crypto/catalog');
    } catch (error) {
        // res.locals.errors = [error.message];
        res.render('user/404');
    }
});

cryptoActionsRouter.get('/edit/:cryptoId', preloadCrypto, async (req, res) => {
    try {
        isCorrectUser(req.user._id, req.crypto.owner);

        const crypto = await getOneWithOptions(req.params.cryptoId, req.user._id);

        res.render('crypto/edit', crypto);
    } catch (error) {
        res.locals.errors = [error.message];

        res.render('user/404');
    }
});

cryptoActionsRouter.post('/edit/:cryptoId', preloadCrypto, async (req, res) => {
    const cryptoData = req.body;
    const cryptoId = req.params.cryptoId;

    try {
        isCorrectUser(req.user._id, req.crypto.owner);

        await updateCrypto(cryptoId, cryptoData);

        res.redirect(`/crypto/details/${cryptoId}`);
    } catch (error) {
        res.locals.errors = [error.message];

        res.render('crypto/edit', cryptoData);
    }
});

module.exports = cryptoActionsRouter;