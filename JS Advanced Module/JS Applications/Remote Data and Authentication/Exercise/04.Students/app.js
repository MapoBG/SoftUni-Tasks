async function main() {
    await renderAll();

    const formEl = createEl("form", "", {},
        createEl("h3", "FORM"),
        createEl("input", "", { placeholder: "First Name..." }),
        createEl("input", "", { placeholder: "Last Name..." }),
        createEl("input", "", { placeholder: "Faculty Number..." }),
        createEl("input", "", { placeholder: "Grade..." }),
        createEl("button", "Submit"));

    document.querySelector("body").appendChild(formEl);
    formEl.addEventListener("submit", createNewEntry);
}

main();

async function renderAll() {
    data = await request("http://localhost:3030/jsonstore/collections/students");
    const tbodyEl = document.querySelector("#results tbody");

    tbodyEl.innerHTML = "";

    Object.values(data).forEach(entry => {
        const trEl = createEl("tr", "", {},
            createEl("td", entry.firstName),
            createEl("td", entry.lastName),
            createEl("td", entry.facultyNumber),
            createEl("td", entry.grade));

        tbodyEl.appendChild(trEl);
    });
}

async function createNewEntry(e) {
    e.preventDefault();

    const [firstNameEl, lastNameEl, facultyNumberEl, gradeEl] = e.target.elements;

    if (!firstNameEl.value || !lastNameEl.value || !facultyNumberEl.value || !gradeEl.value) {
        return alert("All fields must be filled!");
    }

    await request("http://localhost:3030/jsonstore/collections/students", {
        method: "post",
        headers: { "Content-Type": "applcation/json" },
        body: JSON.stringify({ firstName: firstNameEl.value, lastName: lastNameEl.value, facultyNumber: facultyNumberEl.value, grade: gradeEl.value })
    });

    renderAll();
    e.target.reset();
}

async function request(url, options) {
    const res = await fetch(url, options);

    if (res.statusText != "OK") {
        console.log(res);
        throw new Error;
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