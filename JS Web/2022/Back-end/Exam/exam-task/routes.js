const homeRouter = require('./controllers/homeController');
const userRouter = require('./controllers/userController');
const cryptoRouter = require('./controllers/cryptoController');
const cryptoActionsRouter = require('./controllers/cryptoActionsController');

const router = require('express').Router();

router.use('/', homeRouter);
router.use('/user', userRouter);
router.use('/crypto', cryptoRouter);
router.use('/crypto-actions', cryptoActionsRouter)

router.use('*', (req, res) => {
    res.render('user/404');
})

module.exports = router;