import * as api from "./api.js";

const host = "http://localhost:3030";
const registerEP = "/users/register";
const loginEP = "/users/login";
const logoutEP = "/users/logout";
const dataEP = "/data/wiki";

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
    return await api.get(host + dataEP + "?sortBy=_createdOn%20desc");
}

export async function getMostRecent() {
    return await api.get(host + dataEP + `?sortBy=_createdOn%20desc&distinct=category`);
}


export async function editItem(itemID, itemData) {
    return await api.put(host + dataEP + `/${itemID}`, itemData);
}

export async function search(searchParam) {
    return await api.get(host + dataEP + `?where=title%20LIKE%20%22${searchParam}%22`)
}