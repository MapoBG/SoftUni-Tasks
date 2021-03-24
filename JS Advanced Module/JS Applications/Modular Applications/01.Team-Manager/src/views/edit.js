import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderView } from "../render.js";
import { editItem, getItem } from "../api/data.js";
import { checkFormData } from "../util.js";

const editTemplate = (itemData, onSubmit, error) => html`
<section id="edit">
    <article class="narrow">
        <header class="pad-med">
            <h1>Edit Team</h1>
        </header>
        <form @submit=${onSubmit} id="edit-form" class="main-form pad-large">
            ${error ? html`<div class="error">${error}</div>` : ""}
            <label>Team name: <input type="text" name="name" .value=${itemData.name}></label>
            <label>Logo URL: <input type="text" name="logoUrl" .value=${itemData.logoUrl}></label>
            <label>Description: <textarea name="description" .value=${itemData.description}></textarea></label>
            <input class="action cta" type="submit" value="Save Changes">
        </form>
    </article>
</section>`;

export async function editPage(ctx) {
    const itemData = await getItem(ctx.params.id);
    const editPage = editTemplate(itemData, onSubmit);

    renderView(editPage, ctx);

    async function onSubmit(e) {
        e.preventDefault();

        const id = ctx.params.id;
        const data = checkFormData(e.target, editTemplate, onSubmit, ctx);

        await editItem(id, data);
        ctx.page.redirect("/details/" + id);
    }
}