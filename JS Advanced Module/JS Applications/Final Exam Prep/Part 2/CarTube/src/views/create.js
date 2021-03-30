import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/data.js";
import { renderView } from "../render.js";
import { checkFormData } from "../util.js";


const createTemplate = (inputData, onSubmit) => html`
<section id="create-listing">
    <div class="container">
        <form @submit=${onSubmit} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>`;

export async function createPage(ctx) {
    const createPage = createTemplate(null, onSubmit);

    renderView(createPage);
    // document.getElementById("createLink").classList.add("active");

    async function onSubmit(e) {
        e.preventDefault();

        const data = checkFormData(e.target, createTemplate, onSubmit);

        await addItem(data);
        ctx.page.redirect("/catalog");
    }
}