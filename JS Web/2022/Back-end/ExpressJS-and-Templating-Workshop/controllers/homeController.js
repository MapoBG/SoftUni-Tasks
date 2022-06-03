const homeRouter = require("express").Router();
const dataService = require("../src/services/dataService");

homeRouter.get("/", (req, res) => {
    dataService.getAll()
        .then((cubesData) => {
            if (req.query.search || req.query.from || req.query.to) {
                dataService.search(req.query)
                    .then((params) => {
                        cubesData = cubesData
                            .filter(cube => {
                                cube.difficultyLevel = Number(cube.difficultyLevel);
                                return cube.difficultyLevel >= params.from && cube.difficultyLevel <= params.to && (cube.name.toLocaleLowerCase().includes(params.search.toLocaleLowerCase()) || cube.description.toLocaleLowerCase().includes(params.search.toLocaleLowerCase()))
                            });
                        // console.log(cubesData);
                        res.render("index", { cubesData });
                    });
                // console.log(cubesData);
            } else {
                res.render("index", { cubesData });
            }
        })
        .catch((err) => res.send(err + "This is Error!"));
});

homeRouter.get("/about", (req, res) => res.render("about"));

//non router variant
// exports.index = (req, res) => res.render("index", { cubesDb });
// exports.about = (req, res) => res.render("about");

module.exports = homeRouter;