const userRouter = require("express").Router();
const dataService = require("../src/services/dataService");

userRouter.get("/login", (req, res) => {
    res.render("user/loginPage");
});

userRouter.get("/register", (req, res) => {
    res.render("user/registerPage");
});

module.exports = userRouter;