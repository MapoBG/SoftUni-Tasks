const userRouter = require("express").Router();
const userService = require("../src/services/userService");

userRouter.get("/login", (req, res) => res.render("user/loginPage"));

userRouter.post("/login", async (req, res) => {

});

userRouter.get("/register", (req, res) => res.render("user/registerPage"));

userRouter.post("/register", async (req, res) => {
    const password = req.body.password;
    const repeatPassword = req.body.repeatPassword;
    const username = req.body.username;

    if (!password === repeatPassword) {
        return false;
    }

    await userService.createUser({ username, password });

    res.redirect("/user/login");
});

module.exports = userRouter;