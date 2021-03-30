import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderView } from "../render.js";
import { deleteItem, getItem } from "../api/data.js";

const detailsTemplate = (itemData, isCreator, deleteUserItem) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${itemData.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${itemData.brand}</li>
            <li><span>Model:</span>${itemData.model}</li>
            <li><span>Year:</span>${itemData.year}</li>
            <li><span>Price:</span>${itemData.price}$</li>
        </ul>

        <p class="description-para">${itemData.description}</p>

        ${isCreator ? buttonsTemplate(itemData, deleteUserItem) : ""}
    </div>
</section>`;

const buttonsTemplate = (itemData, deleteUserItem) => html`
<div class="listings-buttons">
    <a href=${"/edit/" + itemData._id} class="button-list">Edit</a>
    <a @click=${deleteUserItem} href="javascript:void(0)" class="button-list">Delete</a>
</div>`;


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