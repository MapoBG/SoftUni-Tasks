import { getUserData, setUserData, objectToArray } from "./services.js";

const apiKey = "AIzaSyBhvfjgXgt2Auysh-KZG6O8N_oKQ-dwVOM";
const dbUrl = "https://softwiki-5ba71-default-rtdb.firebaseio.com/";

const endPoints = {
    login: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
    register: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
    dbCatalogue: "articles",
    catalogueItem: "articles/"
}

function host(url) {
    let result = dbUrl + url + ".json";
    const user = getUserData();

    if (user) {
        result += `?auth=${user.idToken}`;
    }

    return result;
}

async function request(url, method, body) {
    let options = { method };

    if (body) {
        Object.assign(options, {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    let response = await fetch(url, options);
    let data = await response.json();

    if (data && data.hasOwnProperty("error")) {
        const message = data.error.message;
        throw new Error(message);
    }

    return data;
}

async function get(url) {
    return request(url, "GET");
}

async function post(url, body) {
    return request(url, "POST", body);
}

async function patch(url, body) {
    return request(url, "PATCH", body);
}

async function del(url) {
    return request(url, "DELETE");
}

export async function register(email, password) {
    let response = await post(endPoints.register + apiKey, {
        email,
        password,
        returnSecureToken: true
    });

    setUserData(response);

    return response;
}

export async function login(email, password) {
    let response = await post(endPoints.login + apiKey, {
        email,
        password,
        returnSecureToken: true
    });

    setUserData(response);

    return response;
}

export async function createDbItem(itemData) {
    return post(host(endPoints.dbCatalogue), itemData);
}

export async function getAll() {
    const records = await get(host(endPoints.dbCatalogue));
    return objectToArray(records);
}

export async function getById(id) {
    const record = await get(host(endPoints.catalogueItem + id));
    record._id = id;
    return record;
}

export async function delById(id) {
    return del(host(endPoints.catalogueItem + id));
}

export async function editItem(id, editedItem) {
    return patch(host(endPoints.catalogueItem + id), editedItem);
}