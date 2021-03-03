function attachEvents() {
    document.getElementById("btnLoad").addEventListener("click", getEntries);
    document.getElementById("btnCreate").addEventListener("click", createNewEntry);
}

attachEvents();

async function getEntries() {
    const phonebookEl = document.getElementById("phonebook");
    const res = await fetch("http://localhost:3030/jsonstore/phonebook");
    const data = await res.json();

    phonebookEl.innerHTML = "";

    Object.values(data).forEach(e => {
        const liEl = document.createElement("li");
        liEl.textContent = `${e.person}: ${e.phone}`;
        liEl.id = e._id;

        const btnEl = document.createElement("button");
        btnEl.textContent = "Delete";

        liEl.appendChild(btnEl);
        phonebookEl.appendChild(liEl);
    });

    phonebookEl.addEventListener("click", deleteEntry);
}

async function deleteEntry(e) {
    const liEl = e.target.parentElement;

    const res = await fetch("http://localhost:3030/jsonstore/phonebook/" + liEl.id, {
        method: "delete"
    });

    getEntries();
}

async function createNewEntry() {
    const personEl = document.getElementById("person");
    const phoneEl = document.getElementById("phone");

    const data = {
        person: personEl.value,
        phone: phoneEl.value,
    };

    const res = await fetch("http://localhost:3030/jsonstore/phonebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    getEntries();

    personEl.value = "";
    phoneEl.value = "";
}