const userModel = firebase.auth();
const db = firebase.firestore();

function extendContext(context) {
    const user = getUserData();

    context.logged = Boolean(user);
    context.userEmail = user ? user.email : "";
    return context.loadPartials({
        header: "./templates/partials/header.hbs",
        footer: "./templates/partials/footer.hbs",
    });
}

function checkInput(email, password, rePassword) {
    if (password != rePassword || !email || password.length < 6) {
        return false;
    }

    return true;
}

function saveUserData(data, context) {
    const { user } = data;
    localStorage.setItem("user", JSON.stringify(user));
    context.redirect("/home");
}

function getUserData() {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
}

function checkNewOffer(newOfferObj) {
    if (newOfferObj.itemName && newOfferObj.price && newOfferObj.imgUrl && newOfferObj.brand && newOfferObj.description) {
        return true;
    }
}

function saveNewOffer(newOfferObj, context) {
    db.collection("shoes").add(newOfferObj)
        .then(async function (data) {
            await db.collection("shoes").doc(data.id).update({ id: data.id });
            context.redirect("/home");
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}