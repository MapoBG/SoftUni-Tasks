const userRouter = require('express').Router();

const { sessionName } = require('../config/env');
const { create } = require('../services/userServices');
const { registrationValidator } = require('../services/userValidators');
const { createToken } = require('../services/utils');

userRouter.get("/register", (req, res) => {
    res.render('user/register');
});

userRouter.post("/register", async (req, res) => {
    const userData = req.body;
    const result = registrationValidator(userData);

    if (!result.isValid) {
        res.locals.errors = result.msgs;

        return res.render('user/register', { userData });
    }

    try {
        const newUser = await create(userData);

        const token = createToken(newUser);

        res.cookie(sessionName, token, { httpOnly: true })

        res.render('home');
    } catch (error) {
        res.locals.errors = [error._message];

        return res.render('user/register', { userData });
    }
});

userRouter.get("/login", (req, res) => {
    res.render('user/login');
});

module.exports = userRouter;