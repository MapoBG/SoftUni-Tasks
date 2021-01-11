import { homePage } from "./controllers/home.js";
import { registerPage, loginPage, logout, registerPost, loginPost } from "./controllers/user.js";
import { buy, createPage, createPost, deleteOffer, detailsPage, editPage, editPost } from "./controllers/catalog.js";
import { getUserData } from "./util.js";

const router = Sammy("#root", function () {
    this.use("Handlebars", "hbs");

    const user = getUserData();

    this.userData = {
        logged: user ? true : false,
        ...user,
    }

    this.get("/home", homePage);

    this.get("/register", registerPage);

    this.get("/login", loginPage);

    this.get("/create-new-offer", createPage);

    this.get("/edit-offer/:offerId", editPage);

    this.get("/details/:offerId", detailsPage);

    this.get("/logout", logout);

    this.get("/deleteItem/:offerId", deleteOffer);

    this.post("/register", registerPost);

    this.post("/login", loginPost);

    this.post("/create-new-offer", createPost);

    this.post("/edit-offer/:offerId", editPost);

    this.get("/buy/:offerId", buy);

});

router.run("/home");