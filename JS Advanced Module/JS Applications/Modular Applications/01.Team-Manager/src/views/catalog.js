import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderView } from "../render.js";
import { getAllItems } from "../api/data.js";
import { itemTemplate } from "./itemTemplate.js";
import { setMembersCount } from "../util.js";

const myPageTemplate = (data, ctx) => html`
<section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>

    ${ctx.user ? html`
    <article class="layout narrow">
        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
    </article>` : ""}

    ${data.map(itemTemplate)}
</section>`;

export async function catalogPage(ctx) {
    let data = await getAllItems();

    data = await setMembersCount(data);
    const myPage = myPageTemplate(data, ctx);

    renderView(myPage, ctx);
    document.getElementById("profileLink").classList.add("active");
}