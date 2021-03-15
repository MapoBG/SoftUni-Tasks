import { html, render } from "../node_modules/lit-html/lit-html.js";

const rowTemplate = (data, match) => html`
<tr class=${(match && Object.values(data).some(e=> e.toLowerCase().includes(match))) ? "select" : ""}>
   <td>${data.firstName} ${data.lastName}</td>
   <td>${data.email}</td>
   <td>${data.course}</td>
</tr>`;

const main = document.querySelector("tbody");

async function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   let data = await getData();

   data = Object.values(data);

   update(data);

   async function onClick() {
      const searchParam = document.getElementById("searchField").value.toLowerCase();

      update(data, searchParam);
   }
}

solve();

async function getData() {
   const res = await fetch("http://localhost:3030/jsonstore/advanced/table");
   const data = await res.json();

   return data;
}

function update(data, match = "") {
   const result = data.map(e => rowTemplate(e, match));
   render(result, main);
}