function solve(input) {
    const operands = [];
    const operations = {
        "+": (num1, num2) => {
            return num1 + num2;
        },
        "-": (num1, num2) => {
            return num1 - num2;
        },
        "*": (num1, num2) => {
            return num1 * num2;
        },
        "/": (num1, num2) => {
            return num1 / num2;
        }
    }

    for (const element of input) {
        if (typeof element == "number") {
            operands.push(element);
        } else {
            const [operand1, operand2] = operands.slice(-2);

            if (!operand1 || !operand2) {
                console.log("Error: not enough operands!");
                return;
            }

            const result = operations[element](operand1, operand2);
            operands.splice(operands.length - 2, 2, result);
        }
    }

    if (operands.length == 1) {
        console.log(operands.join(""));
    } else {
        console.log("Error: too many operands!");
    }
}

solve([15,
    '/']);