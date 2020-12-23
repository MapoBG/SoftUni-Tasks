const router = Sammy("#main", function () {

    this.use("Handlebars", "hbs");

    this.get("#/home", function (context) {

        checkUser(context);

        loadPartials(context)
            .then(function () {
                this.partial("./templates/home/home.hbs");
            });
    });

    this.get("#/login", function () {

        this.loadPartials({
            "header": "./templates/common/header.hbs",
            "footer": "./templates/common/footer.hbs",
            "loginForm": "./templates/login/loginForm.hbs",
        }).then(function () {
            this.partial("./templates/login/loginPage.hbs");
        });
    });

    this.get("#/logout", function () {

        firebase.auth().signOut()
            .then(res => {
                sessionStorage.removeItem("userInfo");
                this.redirect("#/home");
            })
            .catch(e => console.error(e));
    });

    this.get("#/register", function () {

        this.loadPartials({
            "header": "./templates/common/header.hbs",
            "footer": "./templates/common/footer.hbs",
            "registerForm": "../templates/register/registerForm.hbs",
        }).then(function () {
            this.partial("./templates/register/registerPage.hbs");
        });
    });

    this.get("#/about", function (context) {

        checkUser(context);

        loadPartials(context)
            .then(function () {
                this.partial("./templates/about/about.hbs");
            });
    });

    this.get("#/catalog", function (context) {

        checkUser(context);
        context.hasNoTeam = true;

        this.loadPartials({
            "header": "./templates/common/header.hbs",
            "footer": "./templates/common/footer.hbs",
            "team": "../templates/catalog/team.hbs",
        }).then(function () {
            this.partial("./templates/catalog/teamCatalog.hbs");
        });
    });

    this.get("#/create-team", function (context) {
        
        checkUser(context);

        this.loadPartials({
            "header": "./templates/common/header.hbs",
            "footer": "./templates/common/footer.hbs",
            "createForm": "./templates/create/createForm.hbs",
        }).then(function () {
            this.partial("./templates/create/createPage.hbs");
        });
    });

    
    this.post("#/register", function (context) {

        const { username, password } = context.params;

        firebase.auth().createUserWithEmailAndPassword(username, password)
            .then(userObj => {
                console.log(userObj);
                this.redirect("#/login");
            })
            .catch(e => console.error(e));
    });

    this.post("#/login", function (context) {

        const { username, password } = context.params;

        firebase.auth().signInWithEmailAndPassword(username, password)
            .then((userObj) => {
                const { uid, email } = userObj.user;
                sessionStorage.setItem("userInfo", JSON.stringify({ uid, email }));
                this.redirect("#/home");
            })
            .catch(e => console.error(e));
    });

});

(() => {
    router.run("#/home");
})();

function loadPartials(context) {
    return context.loadPartials({
        "header": "./templates/common/header.hbs",
        "footer": "./templates/common/footer.hbs",
    });
}

function checkUser(context) {
    const userInfo = sessionStorage.getItem("userInfo");

    if (userInfo) {
        const { email } = JSON.parse(userInfo);
        context.loggedIn = true;
        context.username = email;
    }
}