const accRouter = require("express").Router();

const dataService = require("../src/services/dataService");

accRouter.get("/create", (req, res) => res.render("createAccessory"));

accRouter.get("/attach/:id", async (req, res) => {
    const cube = await dataService.getOne(req.params.id).lean();

    res.render("attachAccessory", cube);
});

accRouter.post("/create", (req, res) => {

    //Validate(create validation func & import it here)

    dataService.saveData(req.body, "Accessory")
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => res.send(err + "This is Error!"));
});

module.exports = accRouter;