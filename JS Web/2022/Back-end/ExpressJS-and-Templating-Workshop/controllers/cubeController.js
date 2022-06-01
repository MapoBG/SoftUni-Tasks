const router = require("../src/routes");

const cubeRouter = require("express").Router();

cubeRouter.get("/create", (req, res) => {
    res.render("create");
});

module.exports = cubeRouter;