import { showHome } from "./home.js";

export async function deleteMovie(movieId) {
    const confirmation = confirm("Are you sure you want to delete this movie?");

    if (confirmation) {
        await fetch("http://localhost:3030/data/movies/" + movieId, {
            method: "delete",
            headers: { "X-Authorization": sessionStorage.getItem("userToken") }
        });

        showHome();
    }
}