const homeRouter = require("../controllers/homeController");
const cubeRouter = require("../controllers/cubeController");
const accRouter = require("../controllers/accController");

const router = require("express").Router();

router.use("/", homeRouter);
router.use("/cubes", cubeRouter);
router.use("/accessories", accRouter);

module.exports = router;