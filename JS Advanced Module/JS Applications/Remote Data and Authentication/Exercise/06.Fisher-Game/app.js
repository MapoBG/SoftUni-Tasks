function attachEvents() {
    document.querySelector(".load").addEventListener("click", renderAllData);
    document.getElementById("catches").addEventListener("click", manipulateData);
    document.querySelector(".add").addEventListener("click", addNewCatch);

    if (sessionStorage.getItem("user")) {
        document.querySelector(".add").disabled = false;
    }
}

attachEvents();

async function renderAllData() {
    const catchesEl = document.getElementById("catches");
    const data = await request("http://localhost:3030/data/catches");

    catchesEl.innerHTML = "";

    Object.values(data).forEach(e => {
        const catchDivEl = createEl("div", "", { class: "catch", "data-id": e._id },
            createEl("label", "Angler"),
            createEl("input", "", { type: "text", class: "angler", value: e.angler }),
            createEl("hr"),
            createEl("label", "Weight"),
            createEl("input", "", { type: "number", class: "weight", value: e.weight }),
            createEl("hr"),
            createEl("label", "Species"),
            createEl("input", "", { type: "text", class: "species", value: e.species }),
            createEl("hr"),
            createEl("label", "Location"),
            createEl("input", "", { type: "text", class: "location", value: e.location }),
            createEl("hr"),
            createEl("label", "Bait"),
            createEl("input", "", { type: "text", class: "bait", value: e.bait }),
            createEl("hr"),
            createEl("label", "Capture Time"),
            createEl("input", "", { type: "number", class: "captureTime", value: e["captureTime "] }),
            createEl("hr"),
            createEl("button", "Update", { class: "update", disabled: true }),
            createEl("button", "Delete", { class: "delete", disabled: true }));

        catchesEl.appendChild(catchDivEl);
    });

    const user = sessionStorage.getItem("user");

    if (user) {
        catchesEl.querySelectorAll("button").forEach(b => {
            b.disabled = false;
        });
    }
}

async function addNewCatch() {
    const addFormEl = document.getElementById("addForm");

    const [anglerEl, weightEl, speciesEl, locationEl, baitEl, captureTimeEl] = addFormEl.elements;

    if (!anglerEl.value || !speciesEl.value) {
        return alert("Angler and species fields must be filled!");
    }

    await request("http://localhost:3030/data/catches", {
        method: "post",
        headers: { "Content-Type": "application/json", "X-Authorization": sessionStorage.getItem("user") },
        body: JSON.stringify({ "angler": anglerEl.value, "weight": weightEl.value, "species": speciesEl.value, "location": locationEl.value, "bait": baitEl.value, "captureTime ": captureTimeEl.value })
    });

    renderAllData();
}

function manipulateData(e) {
    if (e.target.className == "update") {
        updateEntry(e);
    } else if (e.target.className == "delete") {
        deleteEntry(e.target.parentElement.dataset.id);
    }
}

async function updateEntry(ev) {
    const divEl = ev.target.parentElement;

    const angler = divEl.querySelector(".angler").value;
    const weight = divEl.querySelector(".weight").value;
    const species = divEl.querySelector(".species").value;
    const location = divEl.querySelector(".location").value;
    const bait = divEl.querySelector(".bait").value;
    const captureTime = divEl.querySelector(".captureTime").value;

    await request("http://localhost:3030/data/catches/" + ev.target.parentElement.dataset.id, {
        method: "put",
        headers: { "Content-Type": "application/json", "X-Authorization": sessionStorage.getItem("user") },
        body: JSON.stringify({ "angler": angler, "weight": weight, "species": species, "location": location, "bait": bait, "captureTime ": captureTime })
    });
}

async function deleteEntry(id) {
    await request("http://localhost:3030/data/catches/" + id, {
        method: "delete",
        headers: { "X-Authorization": sessionStorage.getItem("user") }
    });

    renderAllData();
}

async function request(url, options) {
    const res = await fetch(url, options);

    if (res.statusText != "OK") {
        alert(res.statusText);
        throw Error;
    }

    const data = await res.json();

    return data;
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

    return newElement;
}