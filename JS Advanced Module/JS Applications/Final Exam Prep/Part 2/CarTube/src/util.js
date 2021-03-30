import { renderView } from "./render.js";

export function checkFormData(form, template, onSubmit) {

    const inputData = getFormData(form);

    if (!inputData.brand || !inputData.model || !inputData.description || !inputData.imageUrl) {
        throw alert("All fields must be filled");
    } else if (inputData.year < 1) {
        throw alert("'Car Year' must be a positive number");
    } else if (inputData.price < 1) {
        throw alert("'Car Price' must be a positive number");
    }

    return inputData;
}

function getFormData(form) {
    const formData = new FormData(form);

    const brand = formData.get("brand");
    const model = formData.get("model");
    const description = formData.get("description");
    const year = Number(formData.get("year"));
    const imageUrl = formData.get("imageUrl");
    const price = Number(formData.get("price"));

    const inputData = {
        brand,
        model,
        description,
        year,
        imageUrl,
        price,
    };

    return inputData;
}