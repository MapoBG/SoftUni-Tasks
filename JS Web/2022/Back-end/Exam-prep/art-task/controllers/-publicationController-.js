const publicationRouter = require('express').Router();

const { isAuth } = require('../middlewares/userMiddleware');
const { createPublication, getAll, getOne } = require('../services/-publicationServices-');


publicationRouter.get('/create', isAuth, (req, res) => res.render('-publications-/create'));

publicationRouter.post('/create', async (req, res) => {
    const publicationData = { ...req.body, author: req.user._id };

    try {
        await createPublication(publicationData);

        res.redirect('/publications/gallery');
    } catch (error) {
        res.locals.errors = [error.message];
        res.render('-publications-/create', { publicationData });
    }
});

publicationRouter.get('/gallery', async (req, res) => {
    try {
        const publications = await getAll().lean();

        res.render('-publications-/gallery', { publications });
    } catch (error) {
        res.locals.errors = [error.message];
        res.render('user/404');
    }
});

publicationRouter.get('/details/:publicationId', async (req, res) => {
    const publicationId = req.params.publicationId;

    try {
        const publication = await getOne(publicationId).lean();
        publication.isAuthor = publication.author.username === req.user.username;
        
        res.render('-publications-/details', publication);
    } catch (error) {
        res.locals.errors = [error.message];
        res.render('user/404');
    }
});

module.exports = publicationRouter;