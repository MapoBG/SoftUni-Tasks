function logInUser(e) {
    e.preventDefault();
    //=================== easier take of input data from form filed, currently e.target == document.forms["login-form"];
    let formData = new FormData(e.target)
    //====================== use formData.get("input name attribute value here") to get input filed values(proper html attribs needed);
    let email = formData.get("email");
    let password = formData.get("password");

    authService.login(email, password);
}

function registerUser(e) {
    e.preventDefault();
    //=================== easier take of input data from form fields, currently e.target == document.forms["register-form"];
    let formData = new FormData(e.target)
    //====================== use formData.get("input name attribute value here") to get input filed values(proper html attribs needed);
    let email = formData.get("email");
    let password = formData.get("password");
    let repeatPassword = formData.get("repeatPassword");

    let isValid = validateRegisterData(email, password, repeatPassword);

    if (isValid) {
        authService.register(email, password);
    }
}

function addMovie(e) {
    e.preventDefault();
    let formData = new FormData(e.target)
    let title = formData.get("title");
    let description = formData.get("description");
    let imageUrl = formData.get("imageUrl");

    let isValid = validateMovieData(title, description, imageUrl);

    if (isValid) {
        movieService.addMovieToDB({
            title,
            description,
            imageUrl,
            creator: userData.email,
            liked: 0,
        });
    }
}