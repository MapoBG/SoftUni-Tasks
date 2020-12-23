const apiKey = "AIzaSyDcl17GIlxLXBrTcchgh5BvnCWhq5N4zfI";
const registerUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
const dbUrl = "https://movies-spa-bd3ec.firebaseio.com/movies/";
let userData = localStorage.getItem("auth");

function renderError(error) {

    fetch("./views/errorBox.hbs")
        .then(res => res.text())
        .then(templ => {
            let template = Handlebars.compile(templ);
            template = template({ error });
            htmlElements.notificationEl().innerHTML = template;
            setTimeout(() => {
                htmlElements.notificationEl().innerHTML = "";
            }, 1000);
        });
}

function renderSuccess(message) {

    fetch("./views/successBox.hbs")
        .then(res => res.text())
        .then(templ => {
            let template = Handlebars.compile(templ);
            template = template({ message });
            htmlElements.notificationEl().innerHTML = template;
            setTimeout(() => {
                history.pushState({}, "", "/");
                router("/"); // redirect to home page
            }, 1000);
        });
}

const authService = {
    login(email, password) {
        fetch(loginUrl, {
            method: "POST",
            body: JSON.stringify({ email, password }),
        })
            .then(res => (res.json()))
            .then(data => {
                let message = "Logged in successfully.";
                checkForError(data, message);
                return data;
            })
            .catch(e => console.error(e))
    },
    register(email, password) {
        fetch(registerUrl, {
            method: "POST",
            body: JSON.stringify({ email, password }),
        })
            .then(res => res.json())
            .then(data => {
                let message = "Successful registration!";
                checkForError(data, message);
                return data;
            })
            .catch(e => console.error(e))
    },
    getAuthData() {
        userData = localStorage.getItem("auth");
        if (typeof userData == "string" && userData != "") {
            userData = JSON.parse(userData);
        }
        if (!userData) {
            userData = "";
        }
        return {
            logged: Boolean(userData.idToken),
            email: userData.email || "",
        };
    },
    logout() {
        localStorage.setItem("auth", ""); //replace user data with "", to logout;
        let message = "Successful logout";
        renderSuccess(message);
    },
};

function checkForError(data, message) {
    let error = data.error;
    if (error) {
        renderError(data.error.message);
        return;
    }
    //============= keep the user logged !!! ==============
    localStorage.setItem("auth", JSON.stringify(data));
    //=====================================================
    renderSuccess(message);
}



const movieService = {
    addMovieToDB(movieObj) {
        fetch(dbUrl + ".json", {
            method: "POST",
            body: JSON.stringify(movieObj),
        })
            .then(res => res.json())
            .then(data => {
                let message = "Created successfully";
                renderSuccess(message);
                return data;
            })
    },
    async getMovies() {
        let res = await fetch(dbUrl + ".json");
        let data = await res.json();
        Object.keys(data)
            .map(key => data[key].id = key);

        return data;
    },
    getMovie(id) {
        let authData = authService.getAuthData();
        let movieData = fetch(`${dbUrl}${id}` + ".json")
            .then(res => res.json());
        let movieTemplate = fetch("./views/movie-details.hbs")
            .then(res => res.text());
        let header = fetch(`./views/header.hbs`)
            .then(res => res.text());
        let footer = fetch(`./views/footer.hbs`)
            .then(res => res.text());

        Promise.all([movieData, movieTemplate, header, footer])
            .then(([movieData, movieTemplate, header, footer]) => {
                let template = Handlebars.compile(movieTemplate);
                movieData.logged = true;

                Handlebars.registerPartial("header", header);
                Handlebars.registerPartial("footer", footer);
                htmlElements.containerDivEl().innerHTML = template(movieData);
                addEventListeners("/");
            })
    },
}

function filterMovies(moviesObj, user) {
    let movies = Object.values(moviesObj).filter(movie => movie.creator == user);

    return movies;
}

function movieDetails(e) {
    e.preventDefault();

    if (e.target.nodeName != "BUTTON") {
        return;
    }

    e.target.href = e.target.parentNode.href;
    let url = new URL(e.target.href);
    let [empty, details, id] = url.pathname.split("/");

    history.pushState({}, "", url.pathname);

    movieService.getMovie(id);
}