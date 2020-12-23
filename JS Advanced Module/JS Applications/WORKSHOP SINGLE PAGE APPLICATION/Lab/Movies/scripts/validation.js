let message = "";

function validateRegisterData(email, password, repeatPassword) {
    email = email.match(/[\w]+@[a-z]+\.?[a-z]{0,}\.?[a-z]{0,}\.[a-z]{2,}/);

    if (password != repeatPassword) {
        message = "Passwords doesn't match!";
        renderError(message);
        return false;
    }

    if (!email) {
        message = "Incorrect email! Please enter correct email address.";
        renderError(message);
        return false;
    }

    if (password.length < 6) {
        message = "Password should be at least 6 characters long.";
        renderError(message);
        return false;
    }

    return true;
}

function validateMovieData(title, description, imageUrl) {
    if (!title || !description || !imageUrl) {
        message = "Invalid inputs!";
        renderError(message);
        return false;
    }

    return true;
}