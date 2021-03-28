import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderView } from "../render.js";
import { getMyItems } from "../api/data.js";
import { itemTemplate } from "./itemTemplate.js";

const myPageTemplate = (data, user) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src=${"/images/" + user.gender + ".png" }>
        <div class="user-content">
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>My memes count: ${data.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        <!-- Display : All created memes by this user (If any) -->
        ${data.length > 0 ? data.map(m => itemTemplate(m, user))
        : html`<p class="no-memes">No memes in database.</p>`}
        <!-- Display : If user doesn't have own memes  -->

    </div>
</section>`;

export async function myPage(ctx) {
    const data = await getMyItems(ctx.user.id);
    const myPage = myPageTemplate(data, ctx.user);

    renderView(myPage);
    // document.getElementById("profileLink").classList.add("active");
}