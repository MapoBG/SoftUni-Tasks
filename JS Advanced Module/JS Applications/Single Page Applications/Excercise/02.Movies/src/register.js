import { register } from "./api/data.js";
import { showHome } from "./home.js";

let main;
let section;

export function setupRegister(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    section.querySelector("form").addEventListener("submit", onSubmit);
}

export async function showRegister() {
    main.innerHTML = "";
    main.appendChild(section);
}

async function onSubmit(e) {
    e.preventDefault();

    const [emailEl, passwordEl, repeatPassEl] = e.target.elements;

    if (!emailEl.value || !passwordEl.value || !repeatPassEl.value) {
        throw new Error(alert("All fields must be filled."));
    } else if (passwordEl.value != repeatPassEl.value) {
        throw new Error(alert("Passwords don't match."));
    }

    await register({ email: emailEl.value, password: passwordEl.value });

    showHome();
}