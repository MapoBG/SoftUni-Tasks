const routes = {
    "/home": "home",
    "/": "home",
    "/login": "login-form",
    "/register": "register-form",
    "/logout": "home",
    "/add-movie": "addMovie-form",
    "/details": "movie-details",
};

const router = (fullPath) => {
    let authData = authService.getAuthData();
    let [path, nextPath, id] = fullPath.split("/");
    path = "/" + path + nextPath;

    let curPage = fetch(`./views/${routes[path]}.hbs`)
        .then(res => res.text());
    let header = fetch(`./views/header.hbs`)
        .then(res => res.text());
    let footer = fetch(`./views/footer.hbs`)
        .then(res => res.text());
    let movieCard = fetch(`./views/movieCard.hbs`)
        .then(res => res.text());


    Promise.all([curPage, header, footer, movieCard])
        .then(async ([curPage, header, footer, movieCard]) => {
            if (authData.logged == true) {
                authData.movies = await movieService.getMovies();
            }

            let template = Handlebars.compile(curPage);
            // authData = authService.getAuthData();

            Handlebars.registerPartial("header", header);
            Handlebars.registerPartial("footer", footer);
            Handlebars.registerPartial("movieCard", movieCard);

            htmlElements.containerDivEl().innerHTML = template(authData);
            addEventListeners(path);
        });
};

router(location.pathname);

function navigateHandler(e) {
    e.preventDefault();

    if (e.target.nodeName == "BUTTON") {
        e.target.href = e.target.parentNode.href;
    } else if (e.target.nodeName != "A") {
        return;
    }
    // ===== create URL obj, to easily extract only the current link path=====
    let url = new URL(e.target.href);
    // =======================================================================
    history.pushState({}, "", url.pathname);

    router(location.pathname);
}