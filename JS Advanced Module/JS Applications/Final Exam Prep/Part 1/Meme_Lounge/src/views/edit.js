import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderView } from "../render.js";
import { editItem, getItem } from "../api/data.js";
import { checkFormData } from "../util.js";
import { notificationTemplate } from "./notification.js";

const editTemplate = (itemData, onSubmit, errorMsg) => html`
${errorMsg ? notificationTemplate(errorMsg) : ""}
<section id="edit-meme">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${itemData.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .value=${itemData.description}></textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${itemData.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`;

export async function editPage(ctx) {
    const itemData = await getItem(ctx.params.id);
    const editPage = editTemplate(itemData, onSubmit);

    renderView(editPage);

    async function onSubmit(e) {
        e.preventDefault();

        const id = ctx.params.id;
        const data = checkFormData(e.target, editTemplate, onSubmit);

        await editItem(id, data);
        ctx.page.redirect("/details/" + id);
    }
}