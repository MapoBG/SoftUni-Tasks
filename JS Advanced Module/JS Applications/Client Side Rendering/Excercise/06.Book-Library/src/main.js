import { render } from "../../node_modules/lit-html/lit-html.js";
import { createNewBook, getAllBookds, getBook, updateBook } from "./data.js";
import { homeTemplate } from "../templates/home.js";
import { addBookTemplate } from "../templates/addBook.js";
import { editTemplate } from "../templates/editBook.js";

const section = document.getElementById("forms");
const main = document.getElementById("main");

export async function addNewBook(e) {
    e.preventDefault();

    const formEl = e.target;

    const [titleEl, authorEl] = formEl.elements;
    if (!titleEl.value || !authorEl.value) {
        return alert("All fields must be filled.");
    }

    await createNewBook({ author: authorEl.value, title: titleEl.value });
    await getMainView();
    formEl.reset();
}

export async function editBook(e) {
    e.preventDefault();

    const formEl = e.target;

    const [unusedEl, titleEl, authorEl] = formEl.elements;
    if (!titleEl.value || !authorEl.value) {
        return alert("All fields must be filled.");
    }

    await updateBook(formEl.dataset.id, { author: authorEl.value, title: titleEl.value });
    await getMainView();
}

export async function renderHome() {
    const data = await getAllBookds();
    render(homeTemplate(data), main);
}

export function setAddSection() {
    render(addBookTemplate(), section);
    document.getElementById("add-form").addEventListener("submit", addNewBook);
}

export async function setEditSection(id) {
    const book = await getBook(id);

    render(editTemplate(book, id), section);
    document.getElementById("edit-form").addEventListener("submit", editBook);
}

export async function getMainView() {
    await renderHome();
    setAddSection();
}