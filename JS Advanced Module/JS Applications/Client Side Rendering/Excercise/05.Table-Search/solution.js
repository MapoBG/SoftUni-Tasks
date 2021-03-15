import { html, render } from "../node_modules/lit-html/lit-html.js";

const rowTemplate = (data, match) => html`
<tr class=${(match && Object.values(data).some(e=> e.toLowerCase().includes(match))) ? "select" : ""}>
   <td>${data.firstName} ${data.lastName}</td>
   <td>${data.email}</td>
   <td>${data.course}</td>
</tr>`;

async function onLoad() {
   document.querySelector('#searchBtn').addEventListener('click', search);

   let data = await getData();

   update(data);

   async function search() {
      const searchParam = document.getElementById("searchField").value.toLowerCase();

      update(data, searchParam);
   }
}

onLoad();

function update(data, match = "") {
   const main = document.querySelector("tbody");
   const result = data.map(e => rowTemplate(e, match));

   render(result, main);
}

async function getData() {
   const res = await fetch("http://localhost:3030/jsonstore/advanced/table");
   const data = await res.json();

   return Object.values(data);
}