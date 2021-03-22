import { html, render } from "../node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

const townListTemplate = () => html`
<ul>
   ${towns.map((town) => html`<li>${town}</li>`)}
</ul>`;

function onLoad() {
   document.querySelector("article button").addEventListener("click", search);
   render(townListTemplate(), document.getElementById("towns"));
}

onLoad();

function search() {
   const liEls = [...document.querySelectorAll("li")];
   liEls.forEach(e => e.classList.remove("active"));

   const searchParam = document.getElementById("searchText").value.toLowerCase();
   const matches = liEls.filter(e => e.textContent.toLowerCase().includes(searchParam));

   matches.forEach(e => e.classList.add("active"));

   document.getElementById("result").textContent = `${matches.length} matches found`;
}


// const searchTemplate = (towns, match) => html`
// <article>
//    <div id="towns">
//       <ul>
//          ${towns.map(t => itemTemplate(t, match))}
//       </ul>
//    </div>
//    <input type="text" id="searchText" />
//    <button @click=${search}>Search</button>
//    <div id="result"></div>
// </article>`;

// const itemTemplate = (town, match) => html`
// <li class=${(match && town.toLowerCase().includes(match)) ? "active" : ""}>${town}</li>`;

// const main = document.body;
// update();

// function update(match = "") {
//    const result = searchTemplate(towns, match);
//    render(result, main);
// }

// function search(e) {
//    const searchParam = document.getElementById("searchText").value.toLowerCase();

//    update(searchParam);
// }