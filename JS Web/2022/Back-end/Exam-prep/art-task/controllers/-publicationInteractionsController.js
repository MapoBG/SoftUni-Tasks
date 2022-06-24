const publicationInteractionsRouter = require('express').Router();

const { isAuth } = require('../middlewares/userMiddleware');
const { sharePublication, deletePublication, getOne, updatePublication } = require('../services/-publicationsServices-');

publicationInteractionsRouter.get('/share/:publicationId', isAuth, async (req, res) => {
    const publicationId = req.params.publicationId;

    try {
        await sharePublication(publicationId, req.user._id);

        res.redirect(`/publications/details/${publicationId}`);
    } catch (error) {
        res.locals.errors = [error.message];
        res.render('user/404');
    }
});

publicationInteractionsRouter.get('/delete/:publicationId', isAuth, async (req, res) => {
    try {
        await deletePublication(req.params.publicationId);

        res.redirect('/publications/gallery');
    } catch (error) {
        res.locals.errors = [error.message];
        res.render('user/404');
    }
});

publicationInteractionsRouter.get('/edit/:publicationId', isAuth, async (req, res) => {
    try {
        const publication = await getOne(req.params.publicationId);

        res.render('-publications-/edit', publication);
    } catch (error) {
        res.locals.errors = [error.message];
        res.render('user/404');
    }
});

publicationInteractionsRouter.post('/edit/:publicationId', isAuth, async (req, res) => {
    const publicationData = req.body;
    const publicationId = req.params.publicationId;

    try {
        await updatePublication(publicationId, publicationData);

        res.redirect(`/publications/details/${publicationId}`);
    } catch (error) {
        res.locals.errors = [error.message];

        res.render('-publications-/edit', publicationData);
    }
});

module.exports = publicationInteractionsRouter;