const userRouter = require('express').Router();

const { sessionName } = require('../config/env');
const { createUser } = require('../services/userServices');
const { registrationValidator, loginValidator } = require('../services/userValidators');
const { createToken, resetValues } = require('../services/utils');

userRouter.get("/register", (req, res) => {
    res.render('user/register');
});

userRouter.post("/register", async (req, res) => {
    const userData = req.body;
    const result = registrationValidator(userData);

    if (!result.isValid) {
        res.locals.errors = result.msgs;
        resetValues(result);

        return res.render('user/register', { userData });
    }

    try {
        const newUser = await createUser(userData);
        const token = await createToken(newUser);

        res.cookie(sessionName, token, { httpOnly: true })

        res.render('home');
    } catch (error) {
        res.locals.errors = [error.message];

        res.render('user/register', { userData });
    }
});

userRouter.get("/login", (req, res) => {
    res.render('user/login');
});

userRouter.post("/login", async (req, res) => {
    const userData = req.body;

    try {
        const { result, user } = await loginValidator(userData);

        if (!result.isValid) {
            res.locals.errors = result.msgs;
            resetValues(result);

            return res.render('user/login', { userData });
        }

        const token = await createToken(user);

        res.cookie(sessionName, token, { httpOnly: true })

        res.render('home');
    } catch (error) {
        res.locals.errors = [error.message];

        res.render('user/login', { userData });
    }
});

userRouter.get('/logout', async (req, res) => {
    res.clearCookie(sessionName);

    res.redirect('/');
});

module.exports = userRouter;