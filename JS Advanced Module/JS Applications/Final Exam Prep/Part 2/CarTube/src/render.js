import { render } from "../../node_modules/lit-html/lit-html.js";

const mainEl = document.querySelector("#site-content");

export function renderView(view) {
    setNav();
    render(view, mainEl);
}

function setNav() {
    let user = sessionStorage.getItem("user");
    const welcomeEl = document.getElementById("welcome");

    // document.getElementById("catalogLink").classList.remove("active");
    const userLinks = document.getElementById("profile");
    const guestLinks = document.getElementById("guest");
    // userLinks.forEach(e => e.classList.remove("active"));
    // guestLinks.forEach(e => e.classList.remove("active"));

    if (user) {
        user = JSON.parse(user);
        welcomeEl.textContent = `Welcome ${user.username}`;
        userLinks.style.display = "inline-block";
        guestLinks.style.display = "none";
    } else {
        userLinks.style.display = "none";
        guestLinks.style.display = "inline-block";
    }
}