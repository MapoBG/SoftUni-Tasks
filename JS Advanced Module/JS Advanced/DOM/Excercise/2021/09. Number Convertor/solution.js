function solve() {
    document.getElementById("selectMenuTo").innerHTML = `<option selected value=""></option>
    <option value="binary">Binary</option>
    <option value="hexadecimal">Hexadecimal</option>`;

    document.querySelector("#container button").addEventListener("click", convert);

    function convert(e) {
        const inputValue = Number(document.getElementById("input").value);
        const selectedOption = document.getElementById("selectMenuTo").value;
        const resultElement = document.getElementById("result");

        if (selectedOption == 'binary') {
            const binaryNr = [];
            for (let i = inputValue; i !== 0;) {
                let binaryResult = i % 2;
                binaryNr.push(binaryResult);
                i = Math.trunc(i / 2);
            }
            resultElement.value = binaryNr.reverse().join("");
        } else if (selectedOption == 'hexadecimal') {
            const hexadecimalNrInNumbers = [];
            const hexadecimalTable = {
                10: 'A',
                11: 'B',
                12: 'C',
                13: 'D',
                14: 'E',
                15: 'F',
            }
            for (let i = inputValue; i !== 0;) {
                let hexadecimalNrResult = i % 16;
                hexadecimalNrInNumbers.push(hexadecimalNrResult);
                i = Math.trunc(i / 16);
            }
            hexadecimalNrInNumbers.reverse();
            for (let index in hexadecimalNrInNumbers) {
                const num = hexadecimalNrInNumbers[index];
                if (num > 9) {
                    hexadecimalNrInNumbers[index] = hexadecimalTable[num];
                }
            }
            resultElement.value = hexadecimalNrInNumbers.join("");
        }
    }
}