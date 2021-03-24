import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderView } from "../render.js";
import { getMyItems } from "../api/data.js";
import { itemTemplate } from "./itemTemplate.js";
import { setMembersCount } from "../util.js";

const myPageTemplate = (data) => html`
<section id="my-teams">

    <article class="pad-med">
        <h1>My Teams</h1>
    </article>
    ${data.length != 0 ? "" : noTeamsTemplate()}
    ${data.map(itemTemplate)}
</section>`;

const noTeamsTemplate = () => html`
<article class="layout narrow">
    <div class="pad-med">
        <p>You are not a member of any team yet.</p>
        <p><a href="/teams">Browse all teams</a> to join one, or use the button bellow to cerate your own team.</p>
    </div>
    <div class=""><a href="/create" class="action cta">Create Team</a></div>
</article>`;

export async function myPage(ctx) {
    let data = await getMyItems(ctx.user);
    data = data.map(i => Object.assign({}, i.team));
    data = await setMembersCount(data);

    const myPage = myPageTemplate(data);

    renderView(myPage, ctx);
    document.getElementById("profileLink").classList.add("active");
}