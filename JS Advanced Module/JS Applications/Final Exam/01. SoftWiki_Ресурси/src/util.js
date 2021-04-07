export function checkFormData(form) {

    const inputData = getFormData(form);
    const categories = ["JavaScript", "C#", "Java", "Python"];

    if (!inputData.title || !inputData.content) {
        throw alert("All fields must be filled");
    } else if (!inputData.category || !categories.includes(inputData.category)) {
        throw alert("Category should be one of the following: JavaScript, C#, Java or Python.");
    }

    return inputData;
}

function getFormData(form) {
    const formData = new FormData(form);

    const title = formData.get("title");
    const category = formData.get("category");
    const content = formData.get("content");

    const inputData = {
        title,
        category,
        content,
    };

    return inputData;
}