import { deleteMovieToDB } from "./api/data.js";
import { showHome } from "./home.js";

export async function deleteMovie(movieId) {
    const confirmation = confirm("Are you sure you want to delete this movie?");

    if (confirmation) {
        await deleteMovieToDB(movieId);

        showHome();
    }
}