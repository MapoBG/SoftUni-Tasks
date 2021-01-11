import { addPartials } from "../services.js";

export async function homePage() {
    await addPartials(this);

    const context = {};

    context.user = this.app.userData;

    this.partial("/templates/homePage.hbs", context);
}

export async function createArticle() {
    await addPartials(this);

    const context = {
        user: this.app.userData
    }

    this.partial("/templates/createForm.hbs", context);
}

export async function postCreate(context) {
    const { title, category, content } = context.params;

    // const response = await post()
}