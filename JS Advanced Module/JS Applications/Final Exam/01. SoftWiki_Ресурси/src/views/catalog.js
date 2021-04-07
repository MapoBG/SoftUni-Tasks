import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderView } from "../render.js";
import { getAllItems } from "../api/data.js";
import { basicItemTemplate } from "./basicItemTemplate.js";

const catalogTemplate = (articles) => html`
<section id="catalog-page" class="content catalogue">
    <h1>All Articles</h1>
    ${articles.length > 0 ? articles.map(basicItemTemplate) : html`<h3 class="no-articles">No articles yet</h3>`}
</section>`;

export async function catalogPage() {
    const data = await getAllItems();
    const catalogPage = catalogTemplate(data);

    renderView(catalogPage);
}