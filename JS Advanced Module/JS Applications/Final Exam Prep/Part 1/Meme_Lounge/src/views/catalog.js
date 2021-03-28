import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderView } from "../render.js";
import { getAllItems } from "../api/data.js";
import { itemTemplate } from "./itemTemplate.js";

const catalogTemplate = (data) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${data.length > 0 ? data.map(m => itemTemplate(m))
            : html`<p class="no-memes">No memes in database.</p>`}
    </div>
</section>`;

export async function catalogPage() {
    const data = await getAllItems();
    const catalogPage = catalogTemplate(data);

    renderView(catalogPage);
    // document.getElementById("catalogLink").classList.add("active");
}