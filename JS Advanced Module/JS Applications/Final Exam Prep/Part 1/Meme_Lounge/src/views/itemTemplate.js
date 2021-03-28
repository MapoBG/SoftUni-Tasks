import { html } from "../../node_modules/lit-html/lit-html.js";

export const itemTemplate = (itemData, user) => html`
<div class=${user ? "user-meme" : "meme" }>
    <div class="card">
        <div class="info">
            <p class="meme-title">${itemData.title}</p>
            <img class="meme-image" alt="meme-img" src=${itemData.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href=${"/details/" + itemData._id}>Details</a>
        </div>
    </div>
</div>`;