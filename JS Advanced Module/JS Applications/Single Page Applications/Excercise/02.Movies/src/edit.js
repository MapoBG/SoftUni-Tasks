import { showDetails } from "./details.js";

let main;
let section;

export function setupEdit(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
    section.querySelector("form").addEventListener("submit", editMovie);
}

export async function showEdit(movieId) {
    const formEl = section.querySelector("form");
    formEl.dataset.id = movieId;

    main.innerHTML = "";
    main.appendChild(section);

    const res = await fetch("http://localhost:3030/data/movies/" + movieId);
    const movie = await res.json();

    const [titleEl, descriptionEl, imageEl] = formEl.elements;

    titleEl.value = movie.title;
    descriptionEl.value = movie.description;
    imageEl.value = movie.img;
}

async function editMovie(e) {
    e.preventDefault();

    const movieId = e.target.dataset.id;

    const [titleEl, descriptionEl, imageEl] = e.target;

    await fetch("http://localhost:3030/data/movies/" + movieId, {
        method: "put",
        headers: { "Content-Type": "application/json", "X-Authorization": sessionStorage.getItem("userToken") },
        body: JSON.stringify({ title: titleEl.value, description: descriptionEl.value, img: imageEl.value })
    });

    showDetails(movieId);
}