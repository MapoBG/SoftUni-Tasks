const publicationRouter = require('express').Router();

const { isAuth } = require('../middlewares/userMiddleware');
const { createPublication } = require('../services/-publicationServices-');

publicationRouter.get('/create', (req, res) => res.render('-publications-/create'));

publicationRouter.post('/create', isAuth, (req, res) => {
    const publicationData = req.body;

    try {
        const newPublication = createPublication(publicationData)
    } catch (error) {
        res.render('-publications-/create', { publicationData });
    }
});

module.exports = publicationRouter;