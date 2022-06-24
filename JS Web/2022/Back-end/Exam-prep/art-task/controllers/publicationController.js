const publicationRouter = require('express').Router();

const { isAuth } = require('../middlewares/userMiddleware');
const { createPublication } = require('../services/-publicationServices-');


publicationRouter.get('/create', (req, res) => res.render('-publications-/create'));

publicationRouter.post('/create', async (req, res) => {
    const publicationData = req.body;

    try {
        const newPublication = await createPublication({ ...publicationData, author: req.user._id });
    } catch (error) {
        res.locals.errors = [error.message];

        res.render('-publications-/create', { publicationData });
    }
});

publicationRouter.get('/gallery', (req, res) => {
    res.render('-publications-/gallery');
});

module.exports = publicationRouter;