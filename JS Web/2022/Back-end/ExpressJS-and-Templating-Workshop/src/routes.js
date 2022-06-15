const homeRouter = require("../controllers/homeController");
const cubeRouter = require("../controllers/cubeController");
const accRouter = require("../controllers/accController");
const userRouter = require("../controllers/userController");

const router = require("express").Router();

router.use("/", homeRouter);
router.use("/cubes", cubeRouter);
router.use("/accessories", accRouter);
router.use("/user", userRouter);
router.use("*", (req, res) => {
    res.render("404");
});

module.exports = router;