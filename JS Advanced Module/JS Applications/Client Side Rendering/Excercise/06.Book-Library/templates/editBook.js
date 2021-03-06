import { html } from "../../node_modules/lit-html/lit-html.js";

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