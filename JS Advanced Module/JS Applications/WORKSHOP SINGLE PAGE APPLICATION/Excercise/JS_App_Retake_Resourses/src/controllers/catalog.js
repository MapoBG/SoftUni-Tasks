import { extendContext, getUserData, checkNewOffer, saveNewOffer, db } from "../util.js";
import "../dbInit.js";

export function createPage(context) {
    extendContext(context)
        .then(() => {
            this.partial("./templates/createOffer.hbs", this.app.userData);
        });
}

export function editPage(context) {
    const { offerId } = context.params;

    db.collection("shoes").doc(offerId).get()
        .then(res => {
            context.offer = { ...res.data(), id: offerId };
            extendContext(context)
                .then(() => {
                    this.partial("./templates/editOffer.hbs", this.app.userData);
                });
        });
}

export function detailsPage(context) {
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
                .then(() => {
                    this.partial("./templates/details.hbs", this.app.userData);
                });
        });
}

export function deleteOffer(context) {
    const { offerId } = context.params;
    db.collection("shoes").doc(offerId).delete()
        .then(() => {
            this.redirect("/home");
        });
}

export function buy(context) {
    const { offerId } = context.params;

    db.collection("shoes").doc(offerId).update({ bought: firebase.firestore.FieldValue.arrayUnion(getUserData().email) })
        .then(this.redirect(`details/${offerId}`));
}

export function editPost(context) {
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
}

export function createPost(context) {
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
}