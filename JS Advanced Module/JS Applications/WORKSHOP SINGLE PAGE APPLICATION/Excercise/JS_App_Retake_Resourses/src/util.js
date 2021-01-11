export const db = firebase.firestore();
import "./dbInit.js";

export async function extendContext(context) {
    const user = getUserData();

    context.logged = Boolean(user);
    context.userEmail = user ? user.email : "";

    const partials = await Promise.all([
        context.load("/templates/partials/header.hbs"),
        context.load("/templates/partials/footer.hbs")
    ]);
    context.partials = {
        header: partials[0],
        footer: partials[1]
    };
}

export function checkInput(email, password, rePassword) {
    if (password != rePassword || !email || password.length < 6) {
        return false;
    }

    return true;
}

export function saveUserData(data, context) {
    const { user } = data;
    localStorage.setItem("user", JSON.stringify(user));
    context.redirect("/home");
}

export function getUserData() {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
}

export function checkNewOffer(newOfferObj) {
    if (newOfferObj.itemName && newOfferObj.price && newOfferObj.imgUrl && newOfferObj.brand && newOfferObj.description) {
        return true;
    }
}

export function saveNewOffer(newOfferObj, context) {
    db.collection("shoes").add(newOfferObj)
        .then(async function (data) {
            await db.collection("shoes").doc(data.id).update({ id: data.id });
            context.redirect("/home");
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}