function printIfNrIsDivisable(number) {
    let result = "";
    let isDevisible = true;

    if (number % 10 === 0) {
        result = 10;
    } else if (number % 7 === 0) {
        result = 7;
    } else if (number % 6 === 0) {
        result = 6;
    } else if (number % 3 === 0) {
        result = 3;
    } else if (number % 2 === 0) {
        result = 2;
    } else {
        isDevisible = false;
        result = "Not divisible";
    }

    if (isDevisible) {
        console.log(`The number is divisible by ${result}`);
    } else {
        console.log(result);
    }
}
printIfNrIsDivisable(30);