function solve(input) {
    let inputArr = input.split(" ").map(Number);
    let avgNum = inputArr.reduce((a, b) => a + b) / inputArr.length;
    let result = [];

    inputArr.forEach(num => {
        if (num > avgNum) {
            result.push(num)
        }
    });

    result = result.sort((a, b) => b - a);
    if (result.length > 5) {
        result = result.slice(0, 5);
        console.log(result.join(" "));
    } else if (result.length == 0) {
        console.log('No');
    } else {
        console.log(result.join(" "));
    }
}
solve('5 2 3 4 -10 30 40 50 20 50 60 60 51')