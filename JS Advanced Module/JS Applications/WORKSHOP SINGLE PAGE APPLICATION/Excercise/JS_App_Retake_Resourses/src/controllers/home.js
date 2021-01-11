import { extendContext, db } from "../util.js";

export async function homePage(context) {
    let shoes;

    try {
        const response = await db.collection("shoes").get();
        shoes = response.docs.map(offer => ({ ...offer.data() }));
    } catch (error) {
        //some error func;
    }

    shoes.sort((a, b) => b.bought.length - a.bought.length);

    const data = Object.assign({ shoes }, this.app.userData);

    await extendContext(context);
    this.partial("./templates/homePage.hbs", data);
}