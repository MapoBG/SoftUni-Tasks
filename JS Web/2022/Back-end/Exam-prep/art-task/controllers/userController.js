const userRouter = require('express').Router();

userRouter.get("/register", (req, res) => {
    res.render('user/register');
});

userRouter.post("/register", (req, res) => {
    res.render('user/register');
});

userRouter.get("/login", (req, res) => {
    res.render('user/login');
});

module.exports = userRouter;