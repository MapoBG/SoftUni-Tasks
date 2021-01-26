function addItem() {
    const textEl = document.getElementById("newItemText");
    const valueEl = document.getElementById("newItemValue");

    const optionEl = document.createElement("option");
    optionEl.value = valueEl.value;
    optionEl.textContent = textEl.value;

    document.getElementById("menu").appendChild(optionEl);

    textEl.value = "";
    valueEl.value = "";
}