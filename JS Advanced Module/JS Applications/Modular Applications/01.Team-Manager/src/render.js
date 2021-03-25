import { render } from "../../node_modules/lit-html/lit-html.js";

const mainEl = document.querySelector("main");

export function renderView(view, ctx) {
    setNav(ctx.user);
    render(view, mainEl);
}

function setNav(user) {
    const userLinks = [...document.querySelectorAll(".user")];
    const guestLinks = [...document.querySelectorAll(".guest")];
    userLinks.forEach(e => e.classList.remove("active"));
    guestLinks.forEach(e => e.classList.remove("active"));

    if (user) {
        guestLinks.forEach(e => e.style.display = "none");
        userLinks.forEach(e => e.style.display = "inline-block");
    } else {
        guestLinks.forEach(e => e.style.display = "inline-block");
        userLinks.forEach(e => e.style.display = "none");
    }
}