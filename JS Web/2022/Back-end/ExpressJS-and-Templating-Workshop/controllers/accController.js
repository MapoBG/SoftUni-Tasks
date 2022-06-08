const accRouter = require("express").Router();

const dataService = require("../src/services/dataService");

accRouter.get("/create", (req, res) => res.render("createAccessory"));

accRouter.get("/attach/:cubeId", async (req, res) => {
    const cube = await dataService.getOne(req.params.cubeId).lean();
    const accessories = await dataService.getAll("Accessory").lean();

    res.render("attachAccessory", { cube, accessories });
});

accRouter.post("/create", (req, res) => {

    //Validate(create validation func & import it here)

    dataService.saveData("Accessory", req.body)
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => res.send(err + "This is Error!"));
});

accRouter.post("/attach/:cubeId", (req, res) => {
    const cubeId = req.params.cubeId;

    dataService.attachAcc(cubeId, req.body.accessory)
        .then(() => {
            res.redirect(`/cubes/details/${cubeId}`);
        })
        .catch((err) => res.send(err + "This is Error!"));
});

module.exports = accRouter;