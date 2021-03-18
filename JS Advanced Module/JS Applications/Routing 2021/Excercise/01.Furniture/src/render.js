import { render } from "../../node_modules/lit-html/lit-html.js";

const mainEl = document.querySelector(".container");

export function renderView(view) {
    setNav();
    render(view, mainEl);
}

function setNav() {
    const user = sessionStorage.getItem("userId");

    document.getElementById("catalogLink").classList.remove("active");
    const userLinks = [...document.getElementById("user").children];
    const guestLinks = [...document.getElementById("guest").children];
    userLinks.forEach(e => e.classList.remove("active"));
    guestLinks.forEach(e => e.classList.remove("active"));

    if (user) {
        document.getElementById("guest").style.display = "none";
        document.getElementById("user").style.display = "inline-block";
    } else {
        document.getElementById("guest").style.display = "inline-block";
        document.getElementById("user").style.display = "none";
    }
}