const router = require('express').Router();

const homeRouter = require('./controllers/homeController');
const userRouter = require('./controllers/userController');
const publicationsRouter = require('./controllers/-publicationsController-');
const publicationInteractionsRouter = require('./controllers/-publicationInteractionsController');

router.use('/', homeRouter);
router.use('/user', userRouter);
router.use('/publications', publicationsRouter);
router.use('/publication-interactions', publicationInteractionsRouter);

router.use('*', (req, res) => {
    res.render('user/404');
})

module.exports = router;