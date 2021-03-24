import page from "../node_modules/page/page.mjs";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { myPage } from "./views/my-teams.js";
import { registerPage } from "./views/register.js";
import { logout } from "./api/data.js";

page("/", contextExpander, homePage);
page("/teams", contextExpander, catalogPage);
page("/create", contextExpander, createPage);
page("/details/:id", contextExpander, detailsPage);
page("/edit/:id", contextExpander, editPage);
page("/login", contextExpander, loginPage);
page("/register", contextExpander, registerPage);
page("/my-teams", contextExpander, myPage);


page.start();

function contextExpander(ctx, next) {
    ctx.user = sessionStorage.getItem("userId");
    next();
}

document.getElementById("logoutBtn").addEventListener("click", async () => {
    await logout();
    page.redirect("/");
});