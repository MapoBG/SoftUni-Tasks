import { html } from "../../node_modules/lit-html/lit-html.js";

export const itemTemplate = (itemData) => html`
<article>
    <h3>${itemData.title}</h3>
    <p>${itemData.content}</p>
    <a href=${"/details/" + itemData._id} class="btn details-btn">Details</a>
</article>`;