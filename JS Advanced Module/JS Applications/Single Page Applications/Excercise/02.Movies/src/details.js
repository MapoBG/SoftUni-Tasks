import { delegateAction } from "./util.js";

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

async function getMovie(movieId) {
    const res = await fetch("http://localhost:3030/data/movies/" + movieId);
    const movie = await res.json();

    return movie;
}

async function createMovieCard(movie) {
    const userId = sessionStorage.getItem("userId");
    const controls = [];

    const [userLikeRes, totalLikesRes] = await Promise.all([
        fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movie._id}%22%20and%20_ownerId%3D%22${userId}%22`),
        fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movie._id}%22&distinct=_ownerId&count`)
    ]);

    let userLike = await userLikeRes.json();
    const likes = await totalLikesRes.json();

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
    const res = await fetch("http://localhost:3030/data/likes", {
        method: "post",
        headers: { "Content-Type": "application/json", "X-Authorization": sessionStorage.getItem("userToken") },
        body: JSON.stringify({ movieId })
    });

    showDetails(movieId);
}