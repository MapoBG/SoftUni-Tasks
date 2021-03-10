import { delegateAction } from "./util.js";
import { addLikeToDB, getLikes, getMovie, getUserLikes } from "./api/data.js";

let main;
let section;

export function setupDetails(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export async function showDetails(movieId) {
    section.innerHTML = "";
    main.innerHTML = "";

    const movie = await getMovie(movieId);
    const card = await createMovieCard(movie);

    section.appendChild(card);
    main.appendChild(section);
}

async function createMovieCard(movie) {
    const userId = sessionStorage.getItem("userId");
    const controls = [];

    let userLike = await getUserLikes(movie._id, userId);
    const likes = await getLikes(movie._id);

    userLike = userLike.filter(l => l._ownerId == userId)[0];

    if (userId) {
        if (userId == movie._ownerId) {
            controls.push(`<a data-id="${movie._id}" class="btn btn-danger" href="#">Delete</a>`, `<a data-id="${movie._id}" class="btn btn-warning" href="#">Edit</a>`);
        } else if (!userLike) {
            controls.push(`<a data-id="${movie._id}" class="btn btn-primary" href="#">Like</a>`);
        }
    }

    controls.push(`<span class="enrolled-span">Liked ${likes}</span>`);

    const divEl = document.createElement("div");
    divEl.classList.add("container");

    divEl.innerHTML = `
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>

        <div class="col-md-8">
            <img class="img-thumbnail"
                src="${movie.img}" alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${movie.description}</p>
            ${controls.join("")}
        </div>
    </div>
    `;

    divEl.querySelector(".col-md-4.text-center").addEventListener("click", delegateAction);

    return divEl;
}

export async function likeMovie(movieId) {
    await addLikeToDB({ movieId });

    showDetails(movieId);
}