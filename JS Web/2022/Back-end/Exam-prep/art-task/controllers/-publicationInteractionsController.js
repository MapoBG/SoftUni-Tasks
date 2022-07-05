const publicationInteractionsRouter = require('express').Router();

const { preloadPublication } = require('../middlewares/publicationMiddleware');
const { isAuth } = require('../middlewares/userMiddleware');
const { sharePublication, deletePublication, getOne, updatePublication } = require('../services/-publicationsServices-');
const { isCorrectUser, shareCorrectUser } = require('../services/userValidators');

publicationInteractionsRouter.use(isAuth);

publicationInteractionsRouter.get('/share/:publicationId', preloadPublication, async (req, res) => {
    const publicationId = req.params.publicationId;

    try {
        shareCorrectUser(req.user._id, req.publication.author);

        await sharePublication(publicationId, req.user._id);

        res.redirect(`/publications/details/${publicationId}`);
    } catch (error) {
        res.locals.errors = [error.message];
        res.render('user/404');
    }
});

publicationInteractionsRouter.get('/delete/:publicationId', preloadPublication, async (req, res) => {
    try {
        isCorrectUser(req.user._id, req.publication.author);

        await deletePublication(req.params.publicationId);

        res.redirect('/publications/gallery');
    } catch (error) {
        res.locals.errors = [error.message];
        res.render('user/404');
    }
});

publicationInteractionsRouter.get('/edit/:publicationId', preloadPublication, async (req, res) => {
    try {
        isCorrectUser(req.user._id, req.publication.author);

        res.render('-publications-/edit', req.publication);
    } catch (error) {
        res.locals.errors = [error.message];
        res.render('user/404');
    }
});

publicationInteractionsRouter.post('/edit/:publicationId', preloadPublication, async (req, res) => {
    const publicationData = req.body;
    const publicationId = req.params.publicationId;

    try {
        isCorrectUser(req.user._id, req.publication.author);

        await updatePublication(publicationId, publicationData);

        res.redirect(`/publications/details/${publicationId}`);
    } catch (error) {
        res.locals.errors = [error.message];

        res.render('-publications-/edit', publicationData);
    }
});

module.exports = publicationInteractionsRouter;