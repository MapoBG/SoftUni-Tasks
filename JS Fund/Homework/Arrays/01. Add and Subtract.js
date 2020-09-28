function addOrSub(param) {
    let result = [];

    for (let i = 0; i < param.length; i++) {
        let number = param[i];
        if (number % 2 === 0) {
            number += i;
        } else {
            number -= i;
        }
        result.push(number);
    }
    console.log(result);
    console.log(`${param.reduce((a, b) => a + b)}\n${result.reduce((a, b) => a + b)}`);
}
addOrSub([5, 15, 23, 56, 35])