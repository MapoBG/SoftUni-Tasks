const cubeRouter = require("express").Router();
const fs = require("fs/promises");

const cubesDb = require("../src/cubesDB.json");


cubeRouter.get("/create", (req, res) => {
    res.render("create");
});

cubeRouter.post("/create", (req, res) => {
    const cubeInfo = req.body;

    //Validate(create validation func & import it here)

    cubeInfo.id = cubesDb.length + 1;
    cubesDb.push(cubeInfo);
    fs.writeFile("./src/cubesDB.json", JSON.stringify(cubesDb, "", 4))
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => res.send(err));
});


module.exports = cubeRouter;