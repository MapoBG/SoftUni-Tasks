function deleteByEmail() {
    let inputFieldElement = document.getElementsByTagName('input')[0];
    let tableEmailElements = document.querySelectorAll('td:nth-child(2)');
    let divResultsElement = document.getElementById('result');

    tableEmailElements = Array.from(tableEmailElements);

    for (let el of tableEmailElements) {
        if (el.textContent.includes(inputFieldElement.value)) {
            el.parentElement.remove();
            divResultsElement.textContent = 'Deleted.';
            break;
        } else {
            divResultsElement.textContent = 'Not found.';
        }
    }
}