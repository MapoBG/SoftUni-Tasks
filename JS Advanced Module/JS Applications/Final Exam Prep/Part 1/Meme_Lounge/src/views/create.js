import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/data.js";
import { renderView } from "../render.js";
import { checkFormData } from "../util.js";
import { notificationTemplate } from "./notification.js";

const createTemplate = (inputData, onSubmit, errorMsg) => html`
${errorMsg ? notificationTemplate(errorMsg) : ""}
<section id="create-meme">
    <form @submit=${onSubmit} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`;

export async function createPage(ctx) {
    const createPage = createTemplate(null, onSubmit);

    renderView(createPage);
    // document.getElementById("createLink").classList.add("active");

    async function onSubmit(e) {
        e.preventDefault();

        const data = checkFormData(e.target, createTemplate, onSubmit);

        await addItem(data);
        ctx.page.redirect("/catalog");
    }
}