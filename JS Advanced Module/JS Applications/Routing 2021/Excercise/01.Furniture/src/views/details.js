import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderView } from "../render.js";
import { getItem } from "../api/data.js";

const detailsTemplate = (itemData, isCreator) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${itemData.img.startsWith(".") ? itemData.img.slice(1) : itemData.img} />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${itemData.make}</span></p>
        <p>Model: <span>${itemData.model}</span></p>
        <p>Year: <span>${itemData.year}</span></p>
        <p>Description: <span>${itemData.description}</span></p>
        <p>Price: <span>${itemData.price}</span></p>
        <p>Material: <span>${itemData.material}</span></p>
        ${isCreator ? buttonsTemplate(itemData) : ""}
    </div>
</div>`;

const buttonsTemplate = (itemData) => html`
<div>
    <a href=${"/edit/" + itemData._id} class="btn btn-info">Edit</a>
    <a href=${"/delete/" + itemData._id} class="btn btn-red">Delete</a>
</div>`;

export async function detailsPage(ctx) {
    const itemData = await getItem(ctx.params.id);
    const isCreator = itemData._ownerId == sessionStorage.getItem("userId");
    const detailsPage = detailsTemplate(itemData, isCreator);

    renderView(detailsPage);
}