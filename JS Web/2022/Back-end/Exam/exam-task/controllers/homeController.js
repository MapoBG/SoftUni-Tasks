const homeRouter = require('express').Router();

const { getAll } = require('../services/cryptoServices');

homeRouter.get("/", async (req, res) => {
    try {
        const cryptoOffers = await getAll().lean();

        res.render("home", { cryptoOffers });
    } catch (error) {
        // res.locals.errors = [error.message];
        res.render('user/404');
    }
});

module.exports = homeRouter;