const apiKey = "AIzaSyBhvfjgXgt2Auysh-KZG6O8N_oKQ-dwVOM";              //change!!!     
const dbUrl = "https://softwiki-5ba71-default-rtdb.firebaseio.com/";   //change!!! 

const endpoints = {
    LOGIN: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
    REGISTER: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
};

function host(url) {
    let result = dbUrl + url + ".json";
    const auth = sessionStorage.getItem("auth");

    if (auth !== null) {
        result += `?auth=${JSON.parse(auth).idToken}`;
    }

    return result;
}

async function request(url, method, body) {
    let options = {
        method
    };

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

    return data;
}

async function get(url) {
    return request(url, "GET");
}

async function post(url, body) {
    return request(url, "POST", body);
}

async function del(url) {
    return request(url, "DELETE");
}

async function patch(url, body) {
    return request(url, "PATCH", body);
}

export async function login(email, password) {
    let response = await post(endpoints.LOGIN + apiKey, {
        email,
        password,
        returnSecureToken: true
    });

    let data = await response.json();

    sessionStorage.setItem('auth', JSON.stringify(data));

    return data;
}

export async function register(email, password) {
    let response = await post(endpoints.REGISTER + apiKey, {
        email,
        password,
        returnSecureToken: true
    });

    sessionStorage.setItem('auth', JSON.stringify(response));

    return response;
}