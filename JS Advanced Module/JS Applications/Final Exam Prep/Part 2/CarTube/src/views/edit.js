import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderView } from "../render.js";
import { editItem, getItem } from "../api/data.js";
import { checkFormData } from "../util.js";


const editTemplate = (itemData, onSubmit) => html`
<section id="edit-listing">
    <div class="container">

        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value=${itemData.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value=${itemData.model}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value=${itemData.description}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value=${itemData.year}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${itemData.imageUrl}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value=${itemData.price}>

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`;

export async function editPage(ctx) {
    const itemData = await getItem(ctx.params.id);
    const editPage = editTemplate(itemData, onSubmit);

    renderView(editPage);

    async function onSubmit(e) {
        e.preventDefault();

        const id = ctx.params.id;
        const data = checkFormData(e.target, editTemplate, onSubmit);

        data.year = data.year.toString();
        data.price = data.price.toString();

        await editItem(id, data);
        ctx.page.redirect("/details/" + id);
    }
}