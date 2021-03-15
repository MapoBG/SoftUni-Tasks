import { render } from "../node_modules/lit-html/lit-html.js";
import { deleteBook, getBook } from "./data.js";
import { renderHome } from "./home.js";
import { addBookTemplate, addNewBook } from "./addBook.js";
import { editBook, editTemplate } from "./editBook.js";

const section = document.getElementById("forms");

async function addEventListeners() {
    await renderHome();
    document.getElementById("loadBooks").addEventListener("click", getMainView);
    document.querySelector("tbody").addEventListener("click", checkAndRedirect);
}

addEventListeners();

function setAddSection() {
    render(addBookTemplate(), section);
    document.getElementById("add-form").addEventListener("submit", addNewBook);
}

setAddSection();

function setEditSection(book, id) {
    render(editTemplate(book, id), section);
    document.getElementById("edit-form").addEventListener("submit", editBook);
}


async function checkAndRedirect(e) {
    const id = e.target.id;

    if (e.target.tagName == "BUTTON" && e.target.textContent == "Edit") {
        const book = await getBook(id);
        setEditSection(book, id);
    } else if (e.target.tagName == "BUTTON" && e.target.textContent == "Delete") {
        const confirmation = confirm("Are you sure you want to delete this book?");
        if (confirmation) {
            await deleteBook(id);
            getMainView();
        }
    }
}

async function getMainView() {
    await renderHome();
    setAddSection();
}