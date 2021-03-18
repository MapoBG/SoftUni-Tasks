import { renderView } from "./render.js";

export function checkFormData(form, template, onSubmit) {

    const data = getFormData(form);

    if (!data.make || !data.model || !data.year || !data.description || !data.price || !data.img) {
        renderView(template(data, onSubmit, data.make, data.model, data.year, data.description, data.price, data.img));
        throw Error(alert("All fields except 'Material' are obligatory"));
    } else if (data.make.length < 4) {
        renderView(template(data, onSubmit, false, data.model, data.year, data.description, data.price, data.img));
        throw Error(alert("Make must be at least 4 characters long"));
    } else if (data.model.length < 4) {
        renderView(template(data, onSubmit, data.make, false, data.year, data.description, data.price, data.img));
        throw Error(alert("Model must be at least 4 characters long"));
    } else if (data.year < 1950 || data.year > 2050) {
        renderView(template(data, onSubmit, data.make, data.model, false, data.description, data.price, data.img));
        throw Error(alert("Year must be between 1950 and 2050"));
    } else if (data.price <= 0) {
        renderView(template(data, onSubmit, data.make, data.model, data.year, data.description, false, data.img));
        throw Error(alert("Price must be a positive number"));
    }

    return data;
}

function getFormData(form) {
    const formData = new FormData(form);

    const make = formData.get("make");
    const model = formData.get("model");
    const year = Number(formData.get("year"));
    const description = formData.get("description");
    const price = Number(formData.get("price"));
    const img = formData.get("img");
    const material = formData.get("material");

    const data = {
        make,
        model,
        year,
        description,
        price,
        img,
        material
    };

    return data;
}