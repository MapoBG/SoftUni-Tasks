function solve() {
    let inputField = document.getElementById('input');
    let selectMenuElement = document.getElementById('selectMenuTo');
    let convertButton = document.getElementsByTagName('button')[0];
    let resultElement = document.getElementById('result');

    convertButton.addEventListener('click', convertDecimalNr);

    let binaryOption = document.createElement('option');
    binaryOption.setAttribute('value', 'binary');
    binaryOption.innerHTML = "Binary";
    selectMenuElement.appendChild(binaryOption);

    // =============DELETE EMPTY "Option" field=================
    // let optionElementToRemove = document.querySelector('#selectMenuTo > option:nth-child(1)');
    // let removedOptionElement = selectMenuElement.removeChild(optionElementToRemove);

    let hexadecimalOption = document.createElement('option');
    hexadecimalOption.setAttribute('value', 'hexadecimal');
    hexadecimalOption.innerHTML = 'Hexadecimal';
    selectMenuElement.appendChild(hexadecimalOption);

    function convertDecimalNr() {
        let inputNr = Number(inputField.value);
        let selectedOption = selectMenuElement.value;
        if (selectedOption == 'binary') {
            let binaryNr = [];
            for (let i = inputNr; i !== 0;) {
                let binaryResult = i % 2;
                binaryNr.push(binaryResult);
                i = Math.trunc(i / 2);
            }
            resultElement.value = binaryNr.reverse().join("");
        } else if (selectedOption == 'hexadecimal') {
            let hexadecimalNrInNumbers = [];
            let hexadecimalTable = {
                10: 'A',
                11: 'B',
                12: 'C',
                13: 'D',
                14: 'E',
                15: 'F',
            }
            for (let i = inputNr; i !== 0;) {
                let hexadecimalNrResult = i % 16;
                hexadecimalNrInNumbers.push(hexadecimalNrResult);
                i = Math.trunc(i / 16);
            }
            hexadecimalNrInNumbers.reverse();
            for (let index in hexadecimalNrInNumbers) {
                if(hexadecimalNrInNumbers[index] > 9){
                    hexadecimalNrInNumbers[index] = hexadecimalTable[hexadecimalNrInNumbers[index]];
                }
            }
            resultElement.value = hexadecimalNrInNumbers.join("");
        }
    }
}