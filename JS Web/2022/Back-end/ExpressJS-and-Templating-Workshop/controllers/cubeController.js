const cubeRouter = require("express").Router();

const dataService = require("../src/services/dataService");

cubeRouter.get("/create", (req, res) => {
    res.render("create");
});

cubeRouter.get("/details/:id", (req, res) => {
    const cubeId = req.params.id;
    res.render("details", dataService.getOne(cubeId));
})

cubeRouter.post("/create", (req, res) => {
    const cubeInfo = req.body;

    //Validate(create validation func & import it here)
    
    dataService.saveData(cubeInfo)
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => res.send(err + "This is Error!"));
});

module.exports = cubeRouter;