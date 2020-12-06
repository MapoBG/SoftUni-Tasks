let inputEl = document.getElementById("towns");
let ulEl = document.getElementById("root").firstElementChild;
let townsTemplate = document.getElementById("towns-template").innerHTML;
document.getElementById("btnLoadTowns").addEventListener("click", loadTowns);

function loadTowns(event) {
    event.preventDefault();
    let towns = inputEl.value.split(", ");

    let template = Handlebars.compile(townsTemplate)

    ulEl.innerHTML = template({towns});
}