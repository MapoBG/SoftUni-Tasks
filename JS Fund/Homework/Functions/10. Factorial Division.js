function solve(num1, num2) {
    let result = calcFactorial(num1) / calcFactorial(num2);

    console.log(result.toFixed(2));

    function calcFactorial(num) {
        let factorial = [];
        for (let index = num; index > 0; index--) {
            factorial.push(index);
        }
        factorial = factorial.reduce((a, b) => a * b);
        return factorial;
    }
}
solve(6, 2);