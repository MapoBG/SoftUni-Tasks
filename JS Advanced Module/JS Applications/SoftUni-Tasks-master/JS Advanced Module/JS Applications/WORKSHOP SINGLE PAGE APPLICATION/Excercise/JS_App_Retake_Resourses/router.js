const router = Sammy("#root", function () {
    this.use("Handlebars", "hbs");

    this.get("/home", function (context) {
        db.collection("shoes")
            .get()
            .then(res => {
                context.shoes = res.docs.map(offer => { return { ...offer.data() } });
                context.shoes.sort((a, b) => b.bought.length - a.bought.length);
                extendContext(context)
                    .then(function () {
                        this.partial("./templates/homePage.hbs");
                    });
            });
    });

    this.get("/register", function (context) {
        extendContext(context)
            .then(function () {
                this.partial("./templates/registerForm.hbs");
            });
    });

    this.get("/login", function (context) {
        extendContext(context)
            .then(function () {
                this.partial("./templates/loginForm.hbs");
            });
    });

    this.get("/create-new-offer", function (context) {
        extendContext(context)
            .then(function () {
                this.partial("./templates/createOffer.hbs");
            });
    });

    this.get("/edit-offer/:offerId", function (context) {
        const { offerId } = context.params;

        db.collection("shoes").doc(offerId).get()
            .then(res => {
                context.offer = { ...res.data(), id: offerId };
                extendContext(context)
                    .then(function () {
                        this.partial("./templates/editOffer.hbs");
                    });
            })

    });

    this.get("/details/:offerId", function (context) {
        const { offerId } = context.params;

        db.collection("shoes").doc(offerId).get()
            .then(res => {
                const data = res.data()
                const { email } = getUserData();
                const salesman = data.creator == email;
                const userIndex = data.bought.indexOf(email);
                const alreadyBought = userIndex > -1;

                context.offer = { ...data, salesman, alreadyBought };

                extendContext(context)
                    .then(function () {
                        this.partial("./templates/details.hbs");
                    });
            });
    });

    this.get("/logout", function () {
        userModel.signOut()
            .then(() => {
                localStorage.removeItem("user");
                this.redirect("/login");
            });
    });

    this.get("/deleteItem/:offerId", function (context) {
        const { offerId } = context.params;
        db.collection("shoes").doc(offerId).delete()
            .then(() => {
                this.redirect("/home");
            });
    });

    this.post("/register", function (context) {
        const { email, password, rePassword } = context.params;

        if (!checkInput(email, password, rePassword)) {
            return;
        }

        userModel.createUserWithEmailAndPassword(email, password)
            .then(userData => {
                saveUserData(userData, this);
            })
            .catch(error => console.error(error));
    });

    this.post("/login", function (context) {
        const { email, password } = context.params;

        userModel.signInWithEmailAndPassword(email, password)
            .then(userData => {
                saveUserData(userData, this);
            })
            .catch(error => console.error(error));
    });

    this.post("/create-new-offer", function (context) {
        const { itemName, price, imgUrl, brand, description } = context.params;
        const user = getUserData();

        const newOffer = {
            itemName,
            price,
            imgUrl,
            brand,
            description,
            creator: user.email,
            bought: [],
        };

        if (!checkNewOffer(newOffer)) {
            return;
        }

        saveNewOffer(newOffer, context);

    });

    this.post("/edit-offer/:offerId", function (context) {
        const { itemName, price, imgUrl, brand, description, offerId } = context.params;
        const user = getUserData();

        const newOffer = {
            itemName,
            price,
            imgUrl,
            brand,
            description,
        };

        db.collection("shoes").doc(offerId).update(newOffer)
            .then(res => {
                this.redirect(`details/${offerId}`);
            })
    });

    this.get("/buy/:offerId", function (context) {
        const { offerId } = context.params;

        db.collection("shoes").doc(offerId).update({ bought: firebase.firestore.FieldValue.arrayUnion(getUserData().email) })
            .then(this.redirect(`details/${offerId}`));
    });

});

(() => {
    router.run("/home");
})();