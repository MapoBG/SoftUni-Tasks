import { likeMovie } from "./details.js";
import { showEdit } from "./edit.js";
import { deleteMovie } from "./delete.js";

export function delegateAction(e) {
    const movieId = e.target.dataset.id;

    if (e.target.classList.contains("btn-danger")) {
        deleteMovie(movieId);
    } else if (e.target.classList.contains("btn-warning")) {
        showEdit(movieId);
    } else if (e.target.classList.contains("btn-primary")) {
        likeMovie(movieId);
    }
}