import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/data.js";
import { renderView } from "../render.js";
import { checkFormData } from "../util.js";


const createTemplate = (onSubmit) => html`
<section id="create-page" class="content">
    <h1>Create Article</h1>

    <form @submit=${onSubmit} id="create" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="create-title">Title:</label>
                <input type="text" id="create-title" name="title" placeholder="Enter article title">
            </p>

            <p class="field category">
                <label for="create-category">Category:</label>
                <input type="text" id="create-category" name="category" placeholder="Enter article category">
            </p>
            <p class="field">
                <label for="create-content">Content:</label>
                <textarea name="content" id="create-content"></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Create">
            </p>

        </fieldset>
    </form>
</section>`;

export async function createPage(ctx) {
    const createPage = createTemplate(onSubmit);

    renderView(createPage);

    async function onSubmit(e) {
        e.preventDefault();

        const data = checkFormData(e.target);

        await addItem(data);
        ctx.page.redirect("/");
    }
}