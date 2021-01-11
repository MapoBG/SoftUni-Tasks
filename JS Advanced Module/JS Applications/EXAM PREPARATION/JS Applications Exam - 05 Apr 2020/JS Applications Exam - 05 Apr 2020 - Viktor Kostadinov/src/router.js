import { registerPage, loginPage, postRegister, postLogin } from "./controllers/user.js";
import { createPage, deleteArticle, detailsPage, editPage, homePage, postCreate, postEdit } from "./controllers/catalogue.js";
import { getUserData } from "./services.js";
// import * as api from "./data.js"; // import everything(*) from data.js
// window.api = api;

const router = Sammy("#root", function () {
    this.use("Handlebars", "hbs");

    const user = getUserData();
    this.userData = user;

    this.get("/home", homePage);
    this.get("/", homePage);
    this.get("/register", registerPage);
    this.get("/login", loginPage);
    this.get("/create", createPage);
    this.get("/details/:id", detailsPage);
    this.get("/edit/:id", editPage);
    this.get("/delete/:id", deleteArticle);

    this.post("/register", ctx => { postRegister(ctx); }); //post methods with Sammy can't use promises, so it should receive non promise
    this.post("/login", ctx => { postLogin(ctx); });
    this.post("/create", ctx => { postCreate(ctx); });
    this.post("/edit/:id", ctx => { postEdit(ctx); });

});

router.run();