import * as api from "./api.js";

const host = "http://localhost:3030";
const registerEP = "/users/register";
const loginEP = "/users/login";
const logoutEP = "/users/logout";
const moviesEP = "/data/movies";
const likesEP = "/data/likes";

api.settings.host = host;
api.settings.registerEP = registerEP;
api.settings.loginEP = loginEP;
api.settings.logoutEP = logoutEP;

export const logout = api.logout;
export const login = api.login;
export const register = api.register;


export async function addMovieToDB(movieData) {
    return await api.post(host + moviesEP, movieData);
}

export async function deleteMovieFromDB(movieId) {
    return await api.del(host + moviesEP + "/" + movieId);
}

export async function getMovie(movieId) {
    return await api.get(host + moviesEP + "/" + movieId);
}

export async function getMovies() {
    return await api.get(host + moviesEP);
}

export async function addLikeToDB(movieId) {
    return await api.post(host + likesEP, movieId);
}

export async function getLikes(movieId) {
    return await api.get(host + likesEP + `?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`);
}

export async function getUserLikes(movieId, userId) {
    return await api.get(host + likesEP + `?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
}

export async function editMovieInDB(movieId, movieData) {
    return await api.put(host + moviesEP + "/" + movieId, movieData);
}