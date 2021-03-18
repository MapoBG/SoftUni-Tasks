import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/data.js";
import { renderView } from "../render.js";
import { checkFormData } from "../util.js";

const createTemplate = (data, onSubmit, validMake, validModel, validYear, validDesc, validPrice, validImg) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${"form-control" + (validMake ? " is-valid" : " is-invalid")} id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${"form-control" + (validModel ? " is-valid" : " is-invalid")} id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${"form-control" + (validYear ? " is-valid" : " is-invalid")} id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${"form-control" + (validDesc ? " is-valid" : " is-invalid")} id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${"form-control" + (validPrice ? " is-valid" : " is-invalid")} id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${"form-control" + (validImg ? " is-valid" : " is-invalid")} id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>`;

export async function createPage(ctx) {
    const createPage = createTemplate(onSubmit);

    renderView(createPage);
    document.getElementById("createLink").classList.add("active");

    async function onSubmit(e) {
        e.preventDefault();
    
        const data = checkFormData(e.target, createTemplate, onSubmit);
    
        await addItem(data);
        ctx.page.redirect("/");
    }
}