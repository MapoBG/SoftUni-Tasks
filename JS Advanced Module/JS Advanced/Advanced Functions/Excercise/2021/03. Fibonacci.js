function getFibonator() {
    let num = 0;
    let nextNum = 1;

    function fibonacci() {
        let fibNum = num + nextNum;
        num = nextNum;
        nextNum = fibNum;
        return num
    }
    return fibonacci;
}
let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13