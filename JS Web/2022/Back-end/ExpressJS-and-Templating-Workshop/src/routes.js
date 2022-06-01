const homeRouter = require("../controllers/homeController");
const cubeRouter = require("../controllers/cubeController");

const router = require("express").Router();

router.use("/", homeRouter);
router.use("/cubes", cubeRouter);

module.exports = router;