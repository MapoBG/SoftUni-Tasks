const homeRouter = require('./controllers/homeController');
const userRouter = require('./controllers/userController');

const router = require('express').Router();

router.use('/', homeRouter);
router.use('/user', userRouter);

router.use('*', (req, res) => {
    res.render('user/404');
})

module.exports = router;