function printResult(...params) {
    let number = Number(params.shift());

    for (const command of params) {
        number = executeCommand(number, command);
        console.log(number);
    }

    function executeCommand(number, command) {
        switch (command) {
            case "chop":
                number /= 2;
                break;
            case "dice":
                number = Math.sqrt(number);
                break;
            case "spice":
                number += 1;
                break;
            case "bake":
                number *= 3;
                break;
            case "fillet":
                number = number - (number * 0.2);
                break;
        }

        return number;
    }
}
printResult('9', 'dice', 'spice', 'chop', 'bake', 'fillet');