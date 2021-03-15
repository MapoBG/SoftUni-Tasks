import { html } from "../../node_modules/lit-html/lit-html.js";

const bookTemplate = (book, id) => html`
<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
        <button id=${id}>Edit</button>
        <button id=${id}>Delete</button>
    </td>
</tr>`;

export const homeTemplate = (data) => html`
<button id="loadBooks">LOAD ALL BOOKS</button>
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        ${data.map(([id, book]) => bookTemplate(book, id))}
    </tbody>
</table>`;