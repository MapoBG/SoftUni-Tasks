import { getMovies } from "./api/data.js";
import { showDetails } from "./details.js";

let main;
let section;
let container;

export function setupHome(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
    container = section.querySelector(".card-deck.d-flex.justify-content-center");
    container.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-info")) {
            showDetails(e.target.id);
        }
    });
}

export async function showHome() {
    container.innerHTML = "Loading...";
    main.innerHTML = "";
    main.appendChild(section);

    const email = sessionStorage.getItem("userEmail");

    if (email) {
        document.getElementById("welcome-msg").textContent = `Welcome, ${email}`;
        document.getElementById("add-movie-button").style.display = "inline-block";

        [...document.querySelectorAll("nav .user")].forEach(e => e.style.display = "block");
        [...document.querySelectorAll("nav .guest")].forEach(e => e.style.display = "none");
    } else {
        document.getElementById("add-movie-button").style.display = "none";

        [...document.querySelectorAll("nav .user")].forEach(e => e.style.display = "none");
        [...document.querySelectorAll("nav .guest")].forEach(e => e.style.display = "block");
    }

    const movies = await getMovies();
    const cards = movies.map(createMovieCard);

    const fragment = document.createDocumentFragment();

    cards.forEach(element => fragment.appendChild(element));

    container.innerHTML = "";
    container.appendChild(fragment);
}

function createMovieCard(movie) {
    const divEl = document.createElement("div");
    divEl.setAttribute("class", "card mb-4");

    divEl.innerHTML = `
    <img class="card-img-top" src="${movie.img}"
        alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a href="#">
            <button id="${movie._id}" type="button" class="btn btn-info">Details</button>
        </a>
    </div>
    `;

    return divEl;
}