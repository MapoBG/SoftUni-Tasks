import { html } from "../../node_modules/lit-html/lit-html.js";

export const itemTemplate = (itemData) => html`
<div class="listing">
    <div class="preview">
        <img src=${itemData.imageUrl}>
    </div>
    <h2>${itemData.brand} ${itemData.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${itemData.year}</h3>
            <h3>Price: ${itemData.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href=${"/details/" + itemData._id} class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;