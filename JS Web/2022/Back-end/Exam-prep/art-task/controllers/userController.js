const userRouter = require('express').Router();

const { create } = require('../services/userServices');

userRouter.get("/register", (req, res) => {
    res.render('user/register');
});

userRouter.post("/register", (req, res) => {
    const { password, repassword, ...userData } = req.body;
    create(req.body);
    res.end();
});

userRouter.get("/login", (req, res) => {
    res.render('user/login');
});

module.exports = userRouter;