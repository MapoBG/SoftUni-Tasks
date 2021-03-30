import { html } from "../../node_modules/lit-html/lit-html.js";
import { search } from "../api/data.js";
import { renderView } from "../render.js";
import { itemTemplate } from "./itemTemplate.js";

const searchTemplate = (data, onClick) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input type="text" name="search" placeholder="Enter desired production year">
        <button @click=${onClick} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

        ${data.length > 0 ? data.map(itemTemplate)
            : html`<p class="no-cars"> No results.</p>`}

    </div>
</section>`;

export async function searchByYear(ctx) {
    const searchQuery = Number(ctx.querystring.split("=")[1]);
    const data = Number(searchQuery) > 0 ? await search(searchQuery) : [];
    const searchPage = searchTemplate(data, onClick);
    renderView(searchPage);

    async function onClick(e) {
        const searchParam = Number(document.getElementsByName("search")[0].value);
        
        if(searchParam > 0){
            ctx.page.redirect("/search?query=" + searchParam);
        } else {
            alert("Year must be a positive number");
        }
    }
}