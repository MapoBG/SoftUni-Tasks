const accRouter = require("express").Router();

accRouter.get("/create", (req, res) => {
    res.render("createAccessory");
});

module.exports = accRouter;