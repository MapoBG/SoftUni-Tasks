import { setupHome, showHome } from "./home.js";
import { setupDetails } from "./details.js";
import { setupLogin, showLogin } from "./login.js";
import { setupRegister, showRegister } from "./register.js";
import { setupCreate, showCreate } from "./create.js";
import { setupEdit } from "./edit.js";
import { logout } from "./api/data.js";

const main = document.querySelector("main");

const links = {
    "homeLink": showHome,
    "loginLink": showLogin,
    "logoutLink": redirectLogout,
    "registerLink": showRegister,
}

setupSection("home-page", setupHome);
setupSection("movie-details", setupDetails);
setupSection("form-login", setupLogin);
setupSection("form-sign-up", setupRegister);
setupSection("add-movie", setupCreate);
setupSection("edit-movie", setupEdit);

setupNav();

//Start app in home view
showHome();

function setupSection(sectionId, setupFunc) {
    const section = document.getElementById(sectionId);
    setupFunc(main, section);
}

function setupNav() {
    document.querySelector("nav").addEventListener("click", (e) => {
        const view = links[e.target.id];
        if (typeof view == "function") {
            view();
        }
    });

    document.getElementById("add-movie-button").addEventListener("click", () => showCreate());
}

async function redirectLogout() {
    await logout();

    showLogin();
}