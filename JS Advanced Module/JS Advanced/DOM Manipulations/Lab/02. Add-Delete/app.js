function addItem() {
    let ulElement = document.getElementById('items');
    let inputFieldElement = document.getElementById('newText');
    let newLiElement = document.createElement('li');
    let deleteLinkElement = document.createElement('a');

    newLiElement.innerText = inputFieldElement.value + '          ';
    deleteLinkElement.addEventListener('click', deleteElement);
    deleteLinkElement.href = '#';
    deleteLinkElement.textContent = '[Delete]';
    // deleteLinkElement.style = 'text-decoration: none; color: red;';
    newLiElement.appendChild(deleteLinkElement);
    ulElement.appendChild(newLiElement);
    inputFieldElement.value = '';

    console.log(deleteLinkElement);
    console.log(newLiElement);

    function deleteElement(e){
        let targetElement = e.target.parentElement;
        targetElement.remove();
    }
}