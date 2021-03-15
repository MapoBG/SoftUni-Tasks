import { html } from "../node_modules/lit-html/lit-html.js";
import { updateBook } from "./data.js";
import { renderHome } from "./home.js";

export const editTemplate = (book, id) => html`
<form id="edit-form" data-id=${id}>
    <input type="hidden" name="id">
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" value=${book.title}>
    <label>AUTHOR</label>
    <input type="text" name="author" value=${book.author}>
    <input type="submit" value="Save">
</form>`;

export async function editBook(e) {
    e.preventDefault();

    const formEl = e.target;

    const [unusedEl, titleEl, authorEl] = formEl.elements;
    if (!titleEl.value || !authorEl.value) {
        return alert("All fields must be filled.");
    }

    await updateBook(formEl.dataset.id, { author: authorEl.value, title: titleEl.value });
    await renderHome();
}