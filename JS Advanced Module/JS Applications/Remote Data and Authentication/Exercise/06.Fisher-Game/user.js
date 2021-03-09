function main() {
    document.querySelector(".col-md-12 > form:nth-child(2)").addEventListener("submit", registerUser);
    document.querySelector(".col-md-12 > form:nth-child(5)").addEventListener("submit", loginUser);
}

main();

async function registerUser(e) {
    e.preventDefault();

    const [emailEl, passEl, repeatPassEl] = e.target.elements;

    if (!emailEl.value || !passEl.value || !repeatPassEl.value) {
        return alert("All fields must be filled!");
    } else if (passEl.value != repeatPassEl.value) {
        return alert("Passwords don't match.");
    }

    const res = await request("http://localhost:3030/users/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailEl.value, password: passEl.value })
    });

    sessionStorage.setItem("user", res.accessToken);

    document.location.href = "/06.Fisher-Game/index.html";
}

async function loginUser(e) {
    e.preventDefault();

    const [emailEl, passEl] = e.target.elements;

    if (!emailEl.value || !passEl.value) {
        return alert("All fields must be filled!");
    }

    const res = await request("http://localhost:3030/users/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailEl.value, password: passEl.value })
    });

    sessionStorage.setItem("user", res.accessToken);

    document.location.href = "/06.Fisher-Game/index.html";
}

async function request(url, options) {
    const res = await fetch(url, options);

    if (res.statusText != "OK") {
        alert(res.statusText);
        throw Error;
    }

    const data = await res.json();

    return data;
}