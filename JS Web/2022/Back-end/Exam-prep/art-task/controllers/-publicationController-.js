const publicationRouter = require('express').Router();

const { isAuth } = require('../middlewares/userMiddleware');
const { createPublication, getAll } = require('../services/-publicationServices-');


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

    }
});

module.exports = publicationRouter;