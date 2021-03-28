import { render } from "../../node_modules/lit-html/lit-html.js";

const mainEl = document.querySelector("#container main");

export function renderView(view) {
    setNav();
    render(view, mainEl);
}

function setNav() {
    let user = sessionStorage.getItem("user");
    const spanEl = document.querySelector(".profile span");

    // document.getElementById("catalogLink").classList.remove("active");
    const userLinks = [...document.querySelectorAll(".user a")];
    const guestLinks = [...document.querySelectorAll(".guest a")];
    // userLinks.forEach(e => e.classList.remove("active"));
    // guestLinks.forEach(e => e.classList.remove("active"));

    if (user) {
        user = JSON.parse(user);
        spanEl.textContent = user.email;
        spanEl.style.display = "inline-block";
        userLinks.forEach(e => e.style.display = "inline-block");
        guestLinks.forEach(e => e.style.display = "none");
    } else {
        spanEl.style.display = "none";
        userLinks.forEach(e => e.style.display = "none");
        guestLinks.forEach(e => e.style.display = "inline-block");
    }
}