import { addPartials, categoryMap, getUserData, getUserId, mapCategories } from "../services.js";
import { createArticle, deleteById, editArticle, getAll, getById } from "../data.js";

export async function homePage() {
    await addPartials(this);

    this.partials.article = await this.load("/templates/catalogue/article.hbs");

    const data = mapCategories(await getAll());
    const context = data;

    context.user = this.app.userData;

    this.partial("/templates/catalogue/homePage.hbs", context);
}

export async function createPage() {
    await addPartials(this);

    const context = {
        user: this.app.userData
    };

    this.partial("/templates/catalogue/createPage.hbs", context);
}

export async function postCreate(context) {
    const { title, category, content } = context.params;

    try {
        if (!title || !category || !content) {
            throw new Error("All fileds must be filled!");
        } else if (!categoryMap.hasOwnProperty(category)) {
            throw new Error("Invalid Category");
        }

        const result = await createArticle({
            title,
            category,
            content
        });

        context.redirect("/home");
    } catch (error) {
        alert(error.message);
    }
}

export async function detailsPage() {
    await addPartials(this);

    const article = await getById(this.params.id);
    const context = {
        user: this.app.userData,
        article,
        canEdit: article._ownerId == getUserId()
    }

    this.partial("/templates/catalogue/detailsPage.hbs", context);
}

export async function editPage() {
    await addPartials(this);

    const article = await getById(this.params.id);

    if (article._ownerId !== getUserId()) {
        this.redirect("/home");
    } else {
        const context = {
            user: this.app.userData,
            article
        }

        this.partial("/templates/catalogue/editPage.hbs", context);
    }
}

export async function postEdit(context) {
    const { title, category, content } = context.params;

    try {
        if (!title || !category || !content) {
            throw new Error("All fileds must be filled!");
        } else if (!categoryMap.hasOwnProperty(category)) {
            throw new Error("Invalid Category");
        }

        const result = await editArticle(context.params.id, {
            title,
            category,
            content
        });

        context.redirect("/home");
    } catch (error) {
        alert(error.message);
    }
}

export async function deleteArticle() {
    try {
        const id = this.params.id;
        const result = await deleteById(id);
        this.redirect("/home");
    } catch (error) {
        alert(error.message);
    }
}