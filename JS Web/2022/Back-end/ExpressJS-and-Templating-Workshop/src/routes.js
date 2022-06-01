const homeController = require("../controllers/homeController");
const cubeRouter = require("../controllers/cubeController");

const router = require("express").Router();

router.get("/", homeController.index);
router.get("/about", homeController.about);
router.use("/cubes", cubeRouter);

module.exports = router;