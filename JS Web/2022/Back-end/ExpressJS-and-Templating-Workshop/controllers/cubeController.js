const cubeRouter = require("express").Router();

const dataService = require("../src/services/dataService");
const Cube = require("../src/models/Cube");

cubeRouter.get("/create", (req, res) => res.render("create"));

cubeRouter.get("/details/:id", async (req, res) => {
    const cube = await dataService.getOne(req.params.id);

    res.render("details", cube);
});

cubeRouter.post("/create", (req, res) => {
    const newCube = new Cube(req.body);

    //Validate(create validation func & import it here)

    dataService.saveData(newCube)
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => res.send(err + "This is Error!"));
});

module.exports = cubeRouter;