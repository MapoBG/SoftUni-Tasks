const publicationRouter = require('express').Router();

const { isAuth } = require('../middlewares/userMiddleware');
const { createPublication } = require('../services/-publicationServices-');

publicationRouter.use(isAuth);

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

module.exports = publicationRouter;