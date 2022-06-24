const publicationInteractionsRouter = require('express').Router();

const { isAuth } = require('../middlewares/userMiddleware');
const { sharePublication } = require('../services/-publicationsServices-');

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


module.exports = publicationInteractionsRouter;