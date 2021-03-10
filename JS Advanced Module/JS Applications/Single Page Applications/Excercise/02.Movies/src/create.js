import { addMovieToDB } from "./api/data.js";
import { showHome } from "./home.js";

let main;
let section;

export function setupCreate(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    section.querySelector("form").addEventListener("submit", createNewMovie);
}

export async function showCreate() {
    main.innerHTML = "";
    main.appendChild(section);
}

async function createNewMovie(e) {
    e.preventDefault();

    const [titleEl, descrEl, imgEl] = e.target.elements;

    if (!titleEl.value || !descrEl.value || !imgEl.value) {
        throw new Error(alert("All fields must be filled."));
    }

    const movieInfo = {
        title: titleEl.value,
        description: descrEl.value,
        img: imgEl.value
    };

    await addMovieToDB(movieInfo);

    e.target.reset();

    showHome();
}