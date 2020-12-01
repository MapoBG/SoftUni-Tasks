const routes = {
    "/home": "home-template",
    "/login": "login-form-template",
    "/register": "register-form-template",
}

const router = (path) => {
    let appEl = document.getElementById("app");
    let loggedApp = document.getElementById("appLogged");
    let template = Handlebars.compile(document.getElementById(routes[path]).innerHTML);

    if (path == "/home") {
        document.querySelectorAll(".nav-item").forEach((el, index) => {
            if(index == 0 || index == 1){
                el.style.display = "list-item";
            } else {
                el.style.display = "none";
            }
        })

        loggedApp.innerHTML = template();
        appEl.innerHTML = "";
    } else {
        if (appEl.innerHTML == "") {
            appEl.innerHTML = template();
            appEl.querySelector("#app > form").style.display = "block";
            switch (path) {
                case "/login":
                    document.querySelector(".btn.btn-primary").addEventListener("click", loginUser);
                    break;
                case "/register":
                    document.querySelector(".btn.btn-primary").addEventListener("click", registerUser);
                    break;
            }
        } else {
            appEl.innerHTML = "";
        }
    }
}