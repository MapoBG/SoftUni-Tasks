import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderView } from "../render.js";
import { getAllItems } from "../api/data.js";
import { itemTemplate } from "./itemTemplate.js";

const catalogTemplate = (data) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">

        ${data.length > 0 ? data.map(itemTemplate)
        : html`<p class="no-cars">No cars in database.</p>`}

    </div>
</section>`;

export async function catalogPage() {
    const data = await getAllItems();
    const catalogPage = catalogTemplate(data);

    renderView(catalogPage);
    // document.getElementById("catalogLink").classList.add("active");
}