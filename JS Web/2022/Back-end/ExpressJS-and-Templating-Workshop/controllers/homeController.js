const homeRouter = require("express").Router();
const dataService = require("../src/services/dataService");

homeRouter.get("/", (req, res) => {
    let { search, from, to } = req.query;

    dataService.getAll("Cube", search, from, to)
        .lean()
        .then((cubesData) => res.render("index", { cubesData, search, from, to }))
        .catch((err) => res.send("This is Error!\n" + err));
});

homeRouter.get("/about", (req, res) => res.render("about"));

//non router variant
// exports.index = (req, res) => res.render("index", { cubesDb });
// exports.about = (req, res) => res.render("about");

module.exports = homeRouter;