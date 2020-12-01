(function attachListeners() {
    document.querySelector("#container > nav > ul").addEventListener("click", navHandler);
})();

function navHandler(e) {
    e.preventDefault();

    if (!e.target.classList.contains("nav-link")) {
        return;
    }

    let navURL = new URL(e.target.href);

    navigate(navURL.pathname);
}

function loginUser(e) {
    e.preventDefault();

    let emailInput = document.getElementsByName("email")[0];
    let passwordInput = document.getElementsByName("password")[0];

    services.login(emailInput.value, passwordInput.value)
        .then(data => {
            document.querySelector("#container > nav > ul > li:nth-child(1) > a").textContent = `Welcome, ${data.email}`;
            navigate("/home");
        })
}

function registerUser(e) {
    e.preventDefault();

    let emailInput = document.getElementsByName("email")[0];
    let passwordInput = document.getElementsByName("password")[0];
    let repeatPasswordInput = document.getElementsByName("repeatPassword")[0];

}

const navigate = (path) => {
    history.pushState({}, "", path);

    router(path);
}