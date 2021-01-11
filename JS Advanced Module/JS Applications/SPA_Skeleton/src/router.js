import { registerPage, loginPage, postRegister, postLogin, logout } from "./controllers/user.js";
import { createArticle, homePage, postCreate } from "./controllers/catalogue.js";
import { getUserData } from "./services.js";

const router = Sammy("#root", function () {
    this.use("Handlebars", "hbs");

    this.userData = getUserData();

    this.get("/home", homePage);
    this.get("/", homePage);

    this.get("/register", registerPage);
    this.get("/login", loginPage);
    this.get("/logout", logout)

    this.post("/register", context => { postRegister(context) });
    this.post("/login", context => { postLogin(context) });

    this.get("/create", createArticle);

    this.post("/create", context => { postCreate(context) })
});

router.run();