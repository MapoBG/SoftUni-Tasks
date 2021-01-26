function solve() {
    let expressionOutputElement = document.getElementById('expressionOutput');
    let resultOutputElement = document.getElementById('resultOutput');
    let clearButtonElement = document.getElementsByClassName('clear')[0];
    let allButClearButtons = document.querySelectorAll('.keys button');

    clearButtonElement.addEventListener('click', clearBothFields);

    for (let button of allButClearButtons) {
        button.addEventListener('click', addValue);
    }

    function clearBothFields() {
        expressionOutputElement.innerHTML = "";
        resultOutputElement.innerHTML = "";
    }

    function addValue(event) {
        let pressedButton = event.target;

        if (pressedButton.value !== "=") {
            switch (pressedButton.value) {
                case "+":
                case "-":
                case "*":
                case "/":
                    expressionOutputElement.innerHTML += ' ' + pressedButton.value + ' ';
                    break;
                default:
                    expressionOutputElement.innerHTML += pressedButton.value;
                    break;
            }
        } else {
            let [leftNum, operator, rightNum] = expressionOutputElement.innerHTML.split(' ');
            leftNum = Number(leftNum);
            rightNum = Number(rightNum);
            
            if (rightNum !== 0 && leftNum !==0 && operator !== undefined) {
                switch (operator) {
                    case "+":
                    resultOutputElement.innerHTML = leftNum + rightNum;
                        break;
                    case "-":
                        resultOutputElement.innerHTML = leftNum - rightNum;
                        break;
                    case "*":
                        resultOutputElement.innerHTML = leftNum * rightNum;
                        break;
                    case "/":
                        resultOutputElement.innerHTML = leftNum / rightNum;
                        break;
                }
            } else {
                resultOutputElement.innerHTML = "NaN";
            }
        }
    }
}