import { html, render } from "../node_modules/lit-html/lit-html.js";
import { cats as catsData } from "./catSeeder.js";
import { styleMap } from "../node_modules/lit-html/directives/style-map.js";

catsData.forEach(cat => cat.info = false);

const catTemplate = (cat) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn">Show status code</button>
        <div class="status" style=${styleMap(cat.info ? {} : {display: "none"})} id=${cat.id}>
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>`;

function showCatInfo(e) {
    if (e.target.tagName != "BUTTON") {
        return;
    }

    const elementId = e.target.parentElement.querySelector(".status").id;
    const selectedCat = catsData.find(c => c.id == elementId); 
    selectedCat.info = !selectedCat.info;
    onLoad();
}

function onLoad() {
    const sectionEl = document.getElementById("allCats");

    const catsListTemplate = () => html`
    <ul @click=${showCatInfo}>
        ${catsData.map(catTemplate)}
    </ul>`;
    
    render(catsListTemplate(), sectionEl);
}

onLoad();