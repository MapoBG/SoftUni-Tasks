import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMostRecent } from "../api/data.js";
import { renderView } from "../render.js";
import { itemTemplate } from "./itemTemplate.js";

const homeTemplate = (articles) => html`
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
        <h2>JavaScript</h2>
        ${articles.js ? itemTemplate(articles.js) : noArticleTemplate()}
    </section>

    <section class="recent csharp">
        <h2>C#</h2>
        ${articles.cSharp ? itemTemplate(articles.cSharp) : noArticleTemplate()}
    </section>
    <section class="recent java">
        <h2>Java</h2>
        ${articles.java ? itemTemplate(articles.java) : noArticleTemplate()}
    </section>

    <section class="recent python">
        <h2>Python</h2>
        ${articles.python ? itemTemplate(articles.python) : noArticleTemplate()}
    </section>
</section>`;

const noArticleTemplate = () => html`<h3 class="no-articles">No articles yet</h3>`;

export async function homePage() {
    const data = await getMostRecent();
    const articles = {
        js: data.filter(a => a.category == "JavaScript")[0],
        cSharp: data.filter(a => a.category == "C#")[0],
        java: data.filter(a => a.category == "Java")[0],
        python: data.filter(a => a.category == "Python")[0],
    };

    const homePage = homeTemplate(articles);

    renderView(homePage);
}