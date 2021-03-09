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

    const res = await fetch("http://localhost:3030/users/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailEl.value, password: passwordEl.value })
    });

    if (res.ok) {
        const data = await res.json();

        sessionStorage.setItem("userToken", data.accessToken);
        sessionStorage.setItem("userEmail", data.email);
        sessionStorage.setItem("userId", data._id);

        showHome();
    } else {
        const data = await res.json();
        alert(data.message);
    }
}