import { html } from "../../node_modules/lit-html/lit-html.js";
import { search } from "../api/data.js";
import { renderView } from "../render.js";
import { basicItemTemplate } from "./basicItemTemplate.js";

const searchTemplate = (data, onSubmit) => html`
<section id="search-page" class="content">
    <h1>Search</h1>
    <form @submit=${onSubmit} id="search-form">
        <p class="field search">
            <input type="text" placeholder="Search by article title" name="search">
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">
        ${data.length > 0 ? data.map(basicItemTemplate)
            : html`<h3 class="no-articles">No matching articles</h3>`}
    </div>
</section>`;

export async function searchByTitle(ctx) {
    const searchQuery = ctx.querystring.split("=")[1];
    let searchPage;

    if(searchQuery){
        const data = await search(searchQuery);
        searchPage = searchTemplate(data, onSubmit);
    } else {
        searchPage = searchTemplate([], onSubmit);
    }

    renderView(searchPage);

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const searchParam = formData.get("search");

        if (searchParam) {
            ctx.page.redirect("/search?query=" + searchParam);
        }
    }
}