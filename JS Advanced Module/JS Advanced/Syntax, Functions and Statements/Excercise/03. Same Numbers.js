function checkNumber(num) {
    let text = String(num);
    text = text.split("");
    let firstDigit = text[0];
    let areSame = true;

    for (let i = 0; i < text.length; i++) {
        let digit = text[i];
        if (digit != firstDigit) {
            areSame = false;
            break;
        }
    }

    console.log(areSame);
    let sum = text.map(Number).reduce((a, b) => a + b);
    console.log(sum);
}
checkNumber(1234);