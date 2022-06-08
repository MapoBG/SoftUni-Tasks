const accRouter = require("express").Router();

const dataService = require("../src/services/dataService");

accRouter.get("/create", (req, res) => res.render("createAccessory"));

accRouter.post("/create", (req, res) => {

    //Validate(create validation func & import it here)

    dataService.saveData("Accessory", req.body)
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => res.send(err + "This is Error!"));
});

module.exports = accRouter;