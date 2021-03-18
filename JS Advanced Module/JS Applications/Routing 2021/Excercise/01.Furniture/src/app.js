import page from "../node_modules/page/page.mjs";
import { deleteUserItem } from "./deleteItem.js";
import { logoutUser } from "./logout.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { loginPage } from "./views/login.js";
import { myPage } from "./views/my-furniture.js";
import { registerPage } from "./views/register.js";



page("/", catalogPage);
page("/create", createPage);
page("/details/:id", detailsPage);
page("/edit/:id", editPage);
page("/login", loginPage);
page("/register", registerPage);
page("/my-furniture", myPage);
page("/delete/:id", deleteUserItem);
page("/logout", logoutUser);

page.start();