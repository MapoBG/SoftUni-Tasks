const accRouter = require("express").Router();

const dataService = require("../src/services/dataService");
const Accessory = require("../src/models/Accessory");

accRouter.get("/create", (req, res) => res.render("createAccessory"));

accRouter.get("/attach/:id", async (req, res) => {
    const cube = await dataService.getOne(req.params.id);

    res.render("attachAccessory", cube);
});

accRouter.post("/create", (req, res) => {
    const newAccessory = new Accessory(req.body);

    //Validate(create validation func & import it here)

    dataService.saveData(newAccessory)
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => res.send(err + "This is Error!"));
});

module.exports = accRouter;