import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderView } from "../render.js";
import { editItem, getItem } from "../api/data.js";
import { checkFormData } from "../util.js";


const editTemplate = (itemData, onSubmit) => html`
<section id="edit-page" class="content">
    <h1>Edit Article</h1>

    <form @submit=${onSubmit} id="edit" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" placeholder="Enter article title" .value=${itemData.title}>
            </p>

            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" placeholder="Enter article category" .value=${itemData.category}>
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" id="content" .value=${itemData.content}></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Save Changes">
            </p>

        </fieldset>
    </form>
</section>`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const itemData = await getItem(id);
    const editPage = editTemplate(itemData, onSubmit);

    renderView(editPage);

    async function onSubmit(e) {
        e.preventDefault();

        const data = checkFormData(e.target);

        await editItem(id, data);
        ctx.page.redirect("/details/" + id);
    }
}