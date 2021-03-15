import { html, render } from "../node_modules/lit-html/lit-html.js";

const optionTemplate = (data) => html`<option value=${data._id}>${data.text}</option>`;
const menuEl = document.getElementById("menu");

async function onLoad() {
    const options = await getOptions();
    const optionsList = Object.values(options).map(optionTemplate);

    document.querySelector("form").addEventListener("submit", addItem);

    render(optionsList, menuEl);
}

onLoad();

async function addItem(e) {
    e.preventDefault();

    const input = e.target.elements[0].value;

    await addNewOptionToDB(input);
    e.target.reset();
    onLoad();
}

async function getOptions() {
    const res = await fetch("http://localhost:3030/jsonstore/advanced/dropdown");
    const data = await res.json();

    return data;
}

async function addNewOptionToDB(text) {
    await fetch("http://localhost:3030/jsonstore/advanced/dropdown", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });
}