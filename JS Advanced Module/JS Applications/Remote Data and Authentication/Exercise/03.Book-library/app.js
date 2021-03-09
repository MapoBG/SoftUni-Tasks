const editFormEl = document.getElementById("editForm");
const createFormEl = document.getElementById("createForm");

function main() {
    createFormEl.addEventListener("submit", createNewBook);
    editFormEl.addEventListener("submit", putBook);
    document.getElementById("loadBooks").addEventListener("click", loadAllBooks);
}

main();

async function createNewBook(e) {
    e.preventDefault();

    const [titleEl, authorEl] = e.target.elements;

    if (!titleEl.value || !authorEl.value) {
        alert("Both fields must be filled.");
        return;
    }

    const newBook = {
        author: authorEl.value,
        title: titleEl.value
    };

    await fetch("http://localhost:3030/jsonstore/collections/books", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook)
    });

    e.target.reset();
    loadAllBooks();
}

async function loadAllBooks() {
    const tBodyEl = document.querySelector("tbody");
    const res = await fetch("http://localhost:3030/jsonstore/collections/books");
    const data = await res.json();

    tBodyEl.innerHTML = "";

    Object.entries(data).forEach(([key, value]) => {
        const trEl = createEl("tr", "", {},
            createEl("td", value.title),
            createEl("td", value.author),
            createEl("td", "", {},
                createEl("button", "Edit", { value: key }),
                createEl("button", "Delete", { value: key })));

        tBodyEl.appendChild(trEl);
    });
}

function createEl(element, text, attributes = {}, ...elements) {
    const newElement = document.createElement(element);

    if (text) {
        newElement.textContent = text;
    }

    Object
        .keys(attributes)
        .forEach(a => newElement.setAttribute(a, attributes[a]));

    elements.forEach(e => newElement.appendChild(e));

    if (text == "Edit") {
        newElement.addEventListener("click", editBook);
    } else if (text == "Delete") {
        newElement.addEventListener("click", deleteBook);
    }

    return newElement;
}

async function deleteBook(e) {
    const bookId = e.target.value;

    await fetch("http://localhost:3030/jsonstore/collections/books/" + bookId, {
        method: "delete"
    });

    loadAllBooks();
}

async function editBook(e) {
    const res = await fetch("http://localhost:3030/jsonstore/collections/books/" + e.target.value);
    const book = await res.json();

    const [titleEl, authorEl] = editFormEl.elements;

    titleEl.value = book.title;
    authorEl.value = book.author;

    editFormEl.style.display = "block";
    createFormEl.style.display = "none";

    editFormEl.name = e.target.value;
}

async function putBook(e) {
    e.preventDefault();

    await fetch("http://localhost:3030/jsonstore/collections/books/" + e.target.name, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: e.target.author.value, title: e.target.title.value })
    });

    editFormEl.style.display = "none";
    createFormEl.style.display = "block";

    loadAllBooks();
}