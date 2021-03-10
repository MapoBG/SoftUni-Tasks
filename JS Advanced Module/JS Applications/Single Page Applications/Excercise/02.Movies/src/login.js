import { login } from "./api/data.js";
import { showHome } from "./home.js";

let main;
let section;

export function setupLogin(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    section.querySelector("form").addEventListener("submit", onSubmit);
}

export function showLogin() {
    main.innerHTML = "";
    main.appendChild(section);

    [...document.querySelectorAll("nav .user")].forEach(e => e.style.display = "none");
    [...document.querySelectorAll("nav .guest")].forEach(e => e.style.display = "block");
}

async function onSubmit(e) {
    e.preventDefault();

    const [emailEl, passwordEl] = e.target.elements;

    await login({ email: emailEl.value, password: passwordEl.value });

    showHome();
}