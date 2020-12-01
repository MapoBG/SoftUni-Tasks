'use strict';

document.getElementById("loadBooks").addEventListener("click", loadAllData);
document.querySelector("form button").addEventListener("click", addBook);
let editEl = document.getElementById("edit-form");
editEl.addEventListener("click", editBook);
let tableEl = document.querySelector("table tbody");
tableEl.addEventListener("click", checkBtn);
const booksURL = "https://books-62b5c.firebaseio.com/books/"
let bookID = "";

function loadAllData() {
    fetch(booksURL + ".json")
        .then(res => res.json())
        .then(data => generateData(data));
}

function generateData(dataObj) {
    tableEl.innerHTML = "";
    let template = Handlebars.compile(document.getElementById("book-template").innerHTML);

    Object.keys(dataObj).forEach(key => {
        let trEl = document.createElement("tr");
        trEl.setAttribute("id", `${key}`);
        trEl.innerHTML = template(dataObj[key]);
        tableEl.appendChild(trEl);
    });
}

function addBook(e) {
    e.preventDefault();
    let titleInput = document.getElementById("title");
    let authorInput = document.getElementById("author");
    let isbnInput = document.getElementById("isbn");

    let data = {
        title: titleInput.value,
        author: authorInput.value,
        isbn: isbnInput.value,
    }

    fetch(booksURL + ".json", {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(res => loadAllData())

    titleInput.value = "";
    authorInput.value = "";
    isbnInput.value = "";
}

function checkBtn(e) {
    if (e.target.textContent == "Edit") {
        getBook(e);
    } else if (e.target.textContent == "Delete") {
        deleteBook(e);
    }
}

function deleteBook(e) {
    let id = e.target.parentElement.parentElement.id;
    fetch(booksURL + `${id}.json`, {
        method: "DELETE",
    })
        .then(res => loadAllData());
}

function getBook(e) {
    if (editEl.style.display == "none") {
        editEl.style.display = "block";
    }

    bookID = e.target.parentElement.parentElement.id;

    let template = Handlebars.compile(document.getElementById("edit-book-template").innerHTML);

    fetch(booksURL + `${bookID}.json`)
        .then(res => res.json())
        .then(bookInfo => editEl.innerHTML = template(bookInfo))
}

function editBook(e) {
    e.preventDefault();
    if (e.target.textContent != "Edit Book") {
        return;
    }

    let titleInput = document.getElementById("edit-title");
    let authorInput = document.getElementById("edit-author");
    let isbnInput = document.getElementById("edit-isbn");

    let data = {
        title: titleInput.value,
        author: authorInput.value,
        isbn: isbnInput.value,
    }

    fetch(booksURL + `${bookID}.json`, {
        method: "PATCH",
        body: JSON.stringify(data)
    })
        .then(() => editEl.style.display = "none")
        .then(res => loadAllData())
}