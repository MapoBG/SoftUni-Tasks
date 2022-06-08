const cubeRouter = require("express").Router();

const dataService = require("../src/services/dataService");

cubeRouter.get("/create", (req, res) => res.render("create"));

cubeRouter.get("/details/:id", async (req, res) => {
    const cube = await dataService.getOneDetailed(req.params.id).lean();

    res.render("details", cube);
});

cubeRouter.get("/attach-accessories/:cubeId", async (req, res) => {
    const cube = await dataService.getOne(req.params.cubeId).lean();
    const accessories = await dataService.getFiltered(cube.accessories).lean();

    res.render("attachAccessory", { cube, accessories });
});

cubeRouter.post("/create", (req, res) => {

    //Validate(create validation func & import it here)

    dataService.saveData("Cube", req.body)
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => res.send(err + "This is Error!"));
});

module.exports = cubeRouter;