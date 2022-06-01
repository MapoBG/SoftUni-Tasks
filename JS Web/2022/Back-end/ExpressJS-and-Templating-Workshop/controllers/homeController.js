const cubePartial = require("../src/views/partials/cube.hbs");
const cubesDb = require("../src/cubesDB.json");

exports.index = (req, res) => res.render("index", { cubesDb });
exports.about = (req, res) => res.render("about");