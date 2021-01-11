import { createDbItem, delById, editItem, getAll, getById } from "../data.js";
import { addPartials, getUserData, mapCategories } from "../services.js";

export async function homePage() {
    await addPartials(this);
    this.partials.article = await this.load("/templates/article.hbs");

    const context = mapCategories(await getAll());

    context.user = this.app.userData;

    this.partial("/templates/homePage.hbs", context);
}

export async function createPage() {
    await addPartials(this);

    const context = {
        user: this.app.userData
    }

    this.partial("/templates/createForm.hbs", context);
}

export async function postCreate(context) {
    const { title, category, content } = context.params;

    const item = {
        title,
        category,
        content,
        creator: getUserData().email
    }

    const result = await createDbItem(item);
    context.redirect("/");
}

export async function detailsPage() {
    await addPartials(this);

    const article = await getById(this.params.id);
    const context = {
        user: this.app.userData,
        article,
        canEdit: article.creator == getUserData().email
    };

    this.partial("/templates/detailsPage.hbs", context);
}

export async function deleteDbItem() {
    const result = await delById(this.params.id);
    this.redirect("/");
}

export async function editDbItem() {
    await addPartials(this);

    const article = await getById(this.params.id);
    const context = {
        user: this.app.userData,
        article,
    };

    this.partial("/templates/editForm.hbs", context);
}

export async function postEdit(context) {
    const { title, category, content } = context.params;

    const item = {
        title,
        category,
        content,
        creator: getUserData().email
    }

    const result = await editItem(context.params.id, item);
    context.redirect("/");
}