const htmlElements = {
    containerDivEl: () => document.getElementById("container"),
    loginFormEl: () => document.getElementById("login-form"),
    registerFormEl: () => document.getElementById("register-form"),
    notificationEl: () => document.querySelector(".notification"),
    navBarEl: () => document.querySelector(".navbar"),
    addMovieEl: () => document.getElementById("add-movie"),
    moviesListDivEl: () => document.querySelector(".mt-3"),
};

function addEventListeners(path) {
    htmlElements.navBarEl().addEventListener("click", navigateHandler);

    let listeners = {
        "/": () => htmlElements.navBarEl().addEventListener("click", navigateHandler),
        "/home": () => htmlElements.navBarEl().addEventListener("click", navigateHandler),
        "/login": () => htmlElements.loginFormEl().addEventListener('submit', logInUser),
        "/register": () => htmlElements.registerFormEl().addEventListener("submit", registerUser),
        "/logout": () => authService.logout(),
        "/add-movie": () => htmlElements.addMovieEl().addEventListener("submit", addMovie),
        "/details": () => htmlElements.moviesListDivEl().addEventListener("click", movieDetails),
    };

    if (userData.email) {
        listeners["/details"]();
    }

    listeners[path]();
}