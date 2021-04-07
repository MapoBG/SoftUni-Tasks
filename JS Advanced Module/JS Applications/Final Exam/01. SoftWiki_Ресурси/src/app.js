import page from "../node_modules/page/page.mjs";
import { homePage } from "./views/home.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "./api/data.js";
import { searchByTitle } from "./views/search-page.js";


page("/", contextDecorator, homePage);
page("/catalog", catalogPage);
page("/create", createPage);
page("/details/:id", contextDecorator, detailsPage);
page("/edit/:id", editPage);
page("/login", contextDecorator, loginPage);
page("/register", contextDecorator, registerPage);
page("/search", searchByTitle);

page.start();

function contextDecorator(ctx, next) {
    ctx.user = JSON.parse(sessionStorage.getItem("user"));

    next();
}

document.getElementById("logoutLink").addEventListener("click", logoutUser);

async function logoutUser() {
    await logout();
    page.redirect("/");
}