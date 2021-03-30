import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderView } from "../render.js";
import { getMyItems } from "../api/data.js";
import { itemTemplate } from "./itemTemplate.js";

const myPageTemplate = (data) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">

        ${data.length > 0 ? data.map(itemTemplate)
            : html`<p class="no-cars">You haven't listed any cars yet.</p>`}

    </div>
</section>`;

export async function myPage(ctx) {
    const data = await getMyItems(ctx.user.id);
    const myPage = myPageTemplate(data);

    renderView(myPage);
    // document.getElementById("profileLink").classList.add("active");
}