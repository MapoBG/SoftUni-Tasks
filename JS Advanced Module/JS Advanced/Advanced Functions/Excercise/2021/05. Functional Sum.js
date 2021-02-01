function add(num) {

    function sum(x) {
        num += x;
        return sum;
    }

    sum.toString = () => num;

    return sum;
}

console.log(add(1));
console.log(add(1)(6)(-3));