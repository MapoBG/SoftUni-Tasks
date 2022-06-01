const cubesDb = require("../src/cubesDB.json");
const homeRouter = require("express").Router();

homeRouter.get("/", (req, res) => res.render("index", { cubesDb }));
homeRouter.get("/about", (req, res) => res.render("about"));

//non router variant
// exports.index = (req, res) => res.render("index", { cubesDb });
// exports.about = (req, res) => res.render("about");

module.exports = homeRouter;