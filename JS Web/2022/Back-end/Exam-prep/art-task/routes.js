const homeRouter = require('./controllers/homeController');
const userRouter = require('./controllers/userController');
const publicationsRouter = require('./controllers/-publicationsController-');

const router = require('express').Router();

router.use('/', homeRouter);
router.use('/user', userRouter);
router.use('/publications', publicationsRouter);

router.use('*', (req, res) => {
    res.render('user/404');
})

module.exports = router;