import { html, render } from "../node_modules/lit-html/lit-html.js";
import { getAllBookds } from "./data.js";

const main = document.getElementById("main");

const bookTemplate = (book, id) => html`
<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
        <button id=${id}>Edit</button>
        <button id=${id}>Delete</button>
    </td>
</tr>`;

const homeTemplate = (data) => html`
<button id="loadBooks">HOME</button>
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

export async function renderHome() {
    const data = await getAllBookds();
    render(homeTemplate(data), main);
}