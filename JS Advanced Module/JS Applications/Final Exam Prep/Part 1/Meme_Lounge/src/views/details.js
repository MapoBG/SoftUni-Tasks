import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderView } from "../render.js";
import { deleteItem, getItem } from "../api/data.js";

const detailsTemplate = (itemData, isCreator, deleteUserItem) => html`
<section id="meme-details">
    <h1>Meme Title: ${itemData.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${itemData.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${itemData.description}
            </p>
            
            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            ${isCreator ? buttonsTemplate(itemData, deleteUserItem) : ""}

        </div>
    </div>
</section>`;

const buttonsTemplate = (itemData, deleteUserItem) => html`
<a class="button warning" href=${"/edit/" + itemData._id}>Edit</a>
<button @click=${deleteUserItem} class="button danger">Delete</button>`;


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