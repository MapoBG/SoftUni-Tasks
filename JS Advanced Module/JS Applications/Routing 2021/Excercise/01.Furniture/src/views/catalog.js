import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderView } from "../render.js";
import { getAllItems } from "../api/data.js";
import { itemTemplate } from "./itemTemplate.js";

const catalogTemplate = (data) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">
    ${data.map(itemTemplate)}
</div>`;

export async function catalogPage() {
    const data = await getAllItems();
    const catalogPage = catalogTemplate(data);

    renderView(catalogPage);
    document.getElementById("catalogLink").classList.add("active");
}