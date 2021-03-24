import { html } from "../../node_modules/lit-html/lit-html.js";

export const itemTemplate = (itemData) => html`
<article class="layout">
    <img src=${itemData.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${itemData.name}</h2>
        <p>${itemData.description}</p>
        <span class="details">${itemData.members} ${itemData.members == 1 ? "Member" : "Members"}</span>
        <div><a href="/details/${itemData._id}" class="action">See details</a></div>
    </div>
</article>`;