function addItem() {
    let inputNewItemName = document.getElementById("newItemText");
    let inputNewItemValue = document.getElementById("newItemValue");

    let selectElement = document.getElementById("menu");

    let newOption = document.createElement("option");
    newOption.value = inputNewItemValue.value;
    newOption.innerHTML = inputNewItemName.value;
    selectElement.appendChild(newOption);

    inputNewItemName.value = "";
    inputNewItemValue.value = "";
}