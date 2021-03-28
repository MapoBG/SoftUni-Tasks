import * as api from "./api.js";

const host = "http://localhost:3030";
const registerEP = "/users/register";
const loginEP = "/users/login";
const logoutEP = "/users/logout";
const dataEP = "/data/memes";
// const likesEP = "/data/likes";

api.settings.host = host;
api.settings.registerEP = registerEP;
api.settings.loginEP = loginEP;
api.settings.logoutEP = logoutEP;

export const logout = api.logout;
export const login = api.login;
export const register = api.register;


export async function addItem(itemData) {
    return await api.post(host + dataEP, itemData);
}

export async function deleteItem(itemID) {
    return await api.del(host + dataEP + `/${itemID}`);
}

export async function getItem(itemID) {
    return await api.get(host + dataEP + `/${itemID}`);
}

export async function getAllItems() {
    return await api.get(host + "/data/memes?sortBy=_createdOn%20desc");
}

export async function getMyItems(userId) {
    return await api.get(host + dataEP + `?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}


export async function editItem(itemID, itemData) {
    return await api.put(host + dataEP + "/" + itemID, itemData);
}

// export async function addLikeToDB(movieId) {
//     return await api.post(host + likesEP, movieId);
// }

// export async function getLikes(movieId) {
//     return await api.get(host + likesEP + `?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`);
// }

// export async function getUserLikes(movieId, userId) {
//     return await api.get(host + likesEP + `?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
// }