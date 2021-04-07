import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderView } from "../render.js";
import { deleteItem, getItem } from "../api/data.js";

const detailsTemplate = (itemData, isCreator, deleteUserItem) => html`
<section id="details-page" class="content details">
    <h1>${itemData.title}</h1>

    <div class="details-content">
        <strong>Published in category ${itemData.category}</strong>
        <p>${itemData.content}</p>

        <div class="buttons">
            ${isCreator ? buttonsTemplate(itemData, deleteUserItem) : ""}
            <a href="/" class="btn edit">Back</a>
        </div>
    </div>
</section>`;

const buttonsTemplate = (itemData, deleteUserItem) => html`
<a @click=${deleteUserItem} href="javascript:void(0)" class="btn delete">Delete</a>
<a href=${"/edit/" + itemData._id} class="btn edit">Edit</a>`;


export async function detailsPage(ctx) {
    const itemData = await getItem(ctx.params.id);
    const user = ctx.user || {};

    const isCreator = itemData._ownerId == user.id;
    const detailsPage = detailsTemplate(itemData, isCreator, deleteUserItem);

    renderView(detailsPage);

    async function deleteUserItem(e) {
        const confirmation = confirm("Are you sure you want to delete this item?");
        if (confirmation) {
            await deleteItem(ctx.params.id);
            ctx.page.redirect("/catalog");
        }
    }
}