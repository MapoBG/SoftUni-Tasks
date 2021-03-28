import { renderView } from "./render.js";

export function checkFormData(form, template, onSubmit) {

    const inputData = getFormData(form);

    if (!inputData.title || !inputData.description || !inputData.imageUrl) {
        renderView(template(inputData, onSubmit, "All fields must be filled"));
        throw Error();
    }

    return inputData;
}

function getFormData(form) {
    const formData = new FormData(form);

    const title = formData.get("title");
    const description = formData.get("description");
    const imageUrl = formData.get("imageUrl");

    const inputData = {
        title,
        description,
        imageUrl,
    };

    return inputData;
}