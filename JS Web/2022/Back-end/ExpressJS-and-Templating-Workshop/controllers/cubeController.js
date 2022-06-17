const cubeRouter = require("express").Router();

const { isAuth } = require("../src/middlewares/userMiddleware");
const dataService = require("../src/services/dataService");
const { isOwner } = require("../src/services/Utils/utils");

cubeRouter.get("/create", isAuth, (req, res) => res.render("create"));

cubeRouter.post("/create", (req, res) => {
    const cubeInfo = req.body;
    cubeInfo.creator = req.user._id;

    //Validate(create validation func & import it here)

    dataService.saveData("Cube", req.body)
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => res.send(err + "This is Error!"));
});

cubeRouter.get("/details/:cubeId", async (req, res) => {
    const cube = await dataService.getOneDetailed(req.params.cubeId).lean();
    cube.isOwner = isOwner(cube.creator, req.user?._id);

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
    try {
        const cube = await dataService.getOneWithOptions(req.params.cubeId, req.user._id);

        res.render("editCubePage", { cube });
    } catch (error) {
        res.redirect("/404");
    }
});

cubeRouter.post("/edit/:cubeId", async (req, res) => {
    try {
        const cube = await dataService.update(req.params.cubeId, req.user._id, req.body);

        res.redirect(`/cubes/details/${cube._id}`);
    } catch (error) {
        res.redirect("/404");
    }
});

cubeRouter.get("/delete/:cubeId", async (req, res) => {
    try {
        const cube = await dataService.getOneWithOptions(req.params.cubeId, req.user._id);

        res.render("deleteCubePage", { cube });
    } catch (error) {
        res.redirect("/404");
    }
});

cubeRouter.post("/delete/:cubeId", (req, res) => {
    await dataService.delete(req.params.cubeId);

    res.redirect("/");
});

module.exports = cubeRouter;