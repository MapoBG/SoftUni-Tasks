const userRouter = require('express').Router();

const { sessionName } = require('../config/env');
const { isAuth, isGuest } = require('../middlewares/userMiddleware');
const { createUser } = require('../services/userServices');
const { loginValidator } = require('../services/userValidators');
const { createToken, resetValues } = require('../services/utils');

userRouter.get("/register", isGuest, (req, res) => res.render('user/register'));

userRouter.post("/register", isGuest, async (req, res) => {
    const userData = req.body;

    if (userData.password !== userData.repassword) {
        res.locals.errors = ['Passwords should match'];

        return res.render('user/register', { userData });
    }

    try {
        const newUser = await createUser(userData);
        const token = await createToken(newUser);

        res.cookie(sessionName, token, { httpOnly: true })
        res.redirect('/');
    } catch (error) {
        res.locals.errors = [error.message];

        res.render('user/register', { userData });
    }
});

userRouter.get("/login", isGuest, (req, res) => res.render('user/login'));

userRouter.post("/login", isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const { result, user } = await loginValidator(userData);

        if (!result.isValid) {
            res.locals.errors = result.msgs;
            resetValues(result);

            return res.render('user/login', { userData });
        }

        const token = await createToken(user);

        res.cookie(sessionName, token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        res.locals.errors = [error.message];

        res.render('user/login', { userData });
    }
});

userRouter.get('/logout', isAuth, async (req, res) => {
    res.clearCookie(sessionName);
    res.redirect('/');
});

module.exports = userRouter;