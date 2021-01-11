import { registerPage, loginPage, postRegister, postLogin, logout } from "./controllers/user.js";
import { createPage, deleteDbItem, detailsPage, editDbItem, homePage, postCreate, postEdit } from "./controllers/catalogue.js";
import { getUserData } from "./services.js";

const router = Sammy("#root", function () {
    this.use("Handlebars", "hbs");

    this.userData = getUserData();

    this.get("/home", homePage);
    this.get("/", homePage);

    this.get("/register", registerPage);
    this.get("/login", loginPage);
    this.get("/logout", logout);

    this.post("/register", context => { postRegister(context) });
    this.post("/login", context => { postLogin(context) });


    this.get("/create", createPage);
    this.get("/details/:id", detailsPage);
    this.get("/delete/:id", deleteDbItem);
    this.get("/edit/:id", editDbItem);

    this.post("/create", context => { postCreate(context) });
    this.post("/edit/:id", context => { postEdit(context) });
});

router.run();