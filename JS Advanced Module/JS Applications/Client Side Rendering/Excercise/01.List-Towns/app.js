import { html, render } from "../node_modules/lit-html/lit-html.js";

document.getElementById("btnLoadTowns").addEventListener("click", getData);

function getData(e) {
    e.preventDefault();
    const mainEl = document.getElementById("root");

    let data = document.getElementById("towns").value;
    data = data.split(",");

    render(template(data), mainEl);
}

const template = (data) => html`
<ul>
    ${data.map(e => html`<li>${e.trim()}</li>`)}
</ul>`;