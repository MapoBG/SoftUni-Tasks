import { html } from "../node_modules/lit-html/lit-html.js";
import { createNewBook } from "./data.js";
import { renderHome } from "./home.js";

export const addBookTemplate = () => html`
<form id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
</form>`;

export async function addNewBook(e) {
    e.preventDefault();

    const formEl = e.target;

    const [titleEl, authorEl] = formEl.elements;
    if (!titleEl.value || !authorEl.value) {
        return alert("All fields must be filled.");
    }

    await createNewBook({ author: authorEl.value, title: titleEl.value });
    await renderHome();
    formEl.reset();
}