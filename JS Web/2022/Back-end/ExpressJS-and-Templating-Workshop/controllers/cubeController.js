const cubeRouter = require("express").Router();

const dataService = require("../src/services/dataService");

cubeRouter.get("/create", (req, res) => res.render("create"));

cubeRouter.post("/create", (req, res) => {

    //Validate(create validation func & import it here)

    dataService.saveData("Cube", req.body)
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => res.send(err + "This is Error!"));
});

cubeRouter.get("/details/:cubeId", async (req, res) => {
    const cube = await dataService.getOneDetailed(req.params.cubeId).lean();

    res.render("details", cube);
});

cubeRouter.get("/attach-accessories/:cubeId", async (req, res) => {
    const cube = await dataService.getOne(req.params.cubeId).lean();
    const accessories = await dataService.getFiltered(cube.accessories).lean();

    res.render("attachAccessory", { cube, accessories });
});

cubeRouter.post("/attach-accessories/:cubeId", (req, res) => {
    const cubeId = req.params.cubeId;

    dataService.attachAcc(cubeId, req.body.accessory)
        .then(() => {
            res.redirect(`/cubes/details/${cubeId}`);
        })
        .catch((err) => res.send(err + "This is Error!"));
});

cubeRouter.get("/edit/:cubeId", async (req, res) => {
    const cube = await dataService.getOneWithOptions(req.params.cubeId);

    res.render("editCubePage", { cube });
});

module.exports = cubeRouter;