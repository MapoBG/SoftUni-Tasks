import { render } from "../../node_modules/lit-html/lit-html.js";

const mainEl = document.querySelector("#main-content");

export function renderView(view) {
    setNav();
    render(view, mainEl);
}

function setNav() {
    let user = sessionStorage.getItem("user");

    const userLinks = [...document.querySelectorAll("#user a")];
    const guestLinks = [...document.querySelectorAll("#guest a")];

    if (user) {
        userLinks.forEach(l => l.style.display = "inline-block");
        guestLinks.forEach(l => l.style.display = "none");
    } else {
        userLinks.forEach(l => l.style.display = "none");
        guestLinks.forEach(l => l.style.display = "inline-block");
    }
}