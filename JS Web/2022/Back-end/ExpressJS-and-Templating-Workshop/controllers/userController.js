const userRouter = require("express").Router();
const userService = require("../src/services/userService");

userRouter.get("/login", (req, res) => res.render("user/loginPage"));

userRouter.post("/login", async (req, res) => {
    const token = await userService.loginUser(req.body);

    if (!token) {
        return res.redirect("/404");
    }

    res.cookie("session", token);
    
    res.redirect("/");
});

userRouter.get("/register", (req, res) => res.render("user/registerPage"));

userRouter.post("/register", async (req, res) => {
    const newUser = await userService.createUser(req.body);

    if (!newUser) {
        return res.redirect("/404");
    }

    res.redirect("/user/login");
});

module.exports = userRouter;