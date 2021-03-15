import { deleteBook } from "./data.js";
import { getMainView, setEditSection } from "./main.js";

await getMainView();

function addEventListeners() {
    document.getElementById("loadBooks").addEventListener("click", getMainView);
    document.querySelector("tbody").addEventListener("click", checkAndRedirect);
}

addEventListeners();

async function checkAndRedirect(e) {
    const id = e.target.id;

    if (e.target.tagName == "BUTTON" && e.target.textContent == "Edit") {
        setEditSection(id);
    } else if (e.target.tagName == "BUTTON" && e.target.textContent == "Delete") {
        const confirmation = confirm("Are you sure you want to delete this book?");
        if (confirmation) {
            await deleteBook(id);
            getMainView();
        }
    }
}