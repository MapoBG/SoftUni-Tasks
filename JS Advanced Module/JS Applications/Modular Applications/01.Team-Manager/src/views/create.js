import { html } from "../../node_modules/lit-html/lit-html.js";
import { acceptApplication, addItem, applyForTeam } from "../api/data.js";
import { renderView } from "../render.js";
import { checkFormData, getMemberInfo } from "../util.js";

const createTemplate = (data, onSubmit, error) => html`
<section id="create">
    <article class="narrow">
        <header class="pad-med">
            <h1>New Team</h1>
        </header>
        <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
            ${error ? html`<div class="error">${error}</div>` : ""}
            <label>Team name: <input type="text" name="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl"></label>
            <label>Description: <textarea name="description"></textarea></label>
            <input class="action cta" type="submit" value="Create Team">
        </form>
    </article>
</section>`;

export async function createPage(ctx) {
    const createPage = createTemplate(null, onSubmit);

    renderView(createPage, ctx);

    async function onSubmit(e) {
        e.preventDefault();

        const data = checkFormData(e.target, createTemplate, onSubmit, ctx);
        const team = await addItem(data);
        await applyForTeam({ teamId: team._id });

        ctx.params.id = team._id;
        const memberInfo = await getMemberInfo(ctx);
        delete memberInfo.user;
        await acceptApplication(memberInfo);

        ctx.page.redirect("/details/" + team._id);
    }
}