function addItem() {
    let ulElement = document.getElementById('items');
    let inputFieldElement = document.getElementById('newItemText');
    let newLiElement = document.createElement('li');
    newLiElement.textContent = inputFieldElement.value;
    ulElement.appendChild(newLiElement);
    inputFieldElement.value = "";
}