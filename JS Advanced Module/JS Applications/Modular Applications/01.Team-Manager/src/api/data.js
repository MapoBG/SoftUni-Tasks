import * as api from "./api.js";

const host = "http://localhost:3030";
const registerEP = "/users/register";
const loginEP = "/users/login";
const logoutEP = "/users/logout";
const dataEP = "/data/teams";

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

export async function getItem(itemID) {
    return await api.get(host + dataEP + "/" + itemID);
}

export async function getAllItems() {
    return await api.get(host + dataEP);
}

export async function getMembers() {
    return await api.get(host + "/data/members?where=status%3D%22member%22");
}

export async function getMyItems(userId) {
    return await api.get(host + `/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`);
}

export async function getMemberships(teamId) {
    return await api.get(host + `/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`);
}

export async function editItem(itemID, itemData) {
    return await api.put(host + dataEP + "/" + itemID, itemData);
}

export async function applyForTeam(teamId){
    return await api.post(host + "/data/members", teamId);
}

export async function deleteApplication(applicationId){
    return await api.del(host + "/data/members/" + applicationId);
}

export async function acceptApplication(memberInfo){
    return await api.put(host + "/data/members/" + memberInfo._id, memberInfo);
}