export async function getAllBookds() {
    const res = await fetch("http://localhost:3030/jsonstore/collections/books");
    const data = await res.json();

    return Object.entries(data);
}

export async function getBook(id) {
    const res = await fetch("http://localhost:3030/jsonstore/collections/books/" + id);
    const data = await res.json();

    return data;
}

export async function updateBook(id, book) {
    await fetch("http://localhost:3030/jsonstore/collections/books/" + id, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
    });
}

export async function createNewBook(book) {
    await fetch("http://localhost:3030/jsonstore/collections/books", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
    });
}

export async function deleteBook(id) {
    await fetch("http://localhost:3030/jsonstore/collections/books/" + id, {
        method: "delete",
        headers: { "Content-Type": "application/json" }
    });
}