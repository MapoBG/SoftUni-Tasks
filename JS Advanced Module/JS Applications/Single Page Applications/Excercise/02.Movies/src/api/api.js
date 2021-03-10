export let settings = {};

async function request(url, options) {
    const res = await fetch(url, options);

    if (!res.ok) {
        const error = await res.json();
        alert(error.message)
        throw new Error(error.message);
    }

    try {
        return await res.json();
    } catch (error) {
        return res;
    }
}

function createOptions(method = "get", data) {
    const result = {
        method,
        headers: {}
    };

    if (data) {
        result.headers["Content-Type"] = "application/json";
        result.body = JSON.stringify(data);
    }

    const token = sessionStorage.getItem("userToken");
    if (token) {
        result.headers["X-Authorization"] = token;
    }

    return result;
}

export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions("post", data));
}

export async function put(url, data) {
    return request(url, createOptions("put", data));
}

export async function del(url) {
    return request(url, createOptions("delete"));
}


export async function register(userData) {
    const data = await post(settings.host + settings.registerEP, userData);

    sessionStorage.setItem("userToken", data.accessToken);
    sessionStorage.setItem("userEmail", data.email);
    sessionStorage.setItem("userId", data._id);
}

export async function login(userData) {
    const data = await post(settings.host + settings.loginEP, userData);

    sessionStorage.setItem("userToken", data.accessToken);
    sessionStorage.setItem("userEmail", data.email);
    sessionStorage.setItem("userId", data._id);
}

export async function logout() {
    await get(settings.host + settings.logoutEP);

    sessionStorage.clear();
}