const homeRouter = require('./controllers/homeController');

const router = require('express').Router();

router.use('/', homeRouter);

module.exports = router;