const homeRouter = require('./controllers/homeController');
const userRouter = require('./controllers/userController');

const router = require('express').Router();

router.use('/', homeRouter);
router.use('/user', userRouter);

module.exports = router;