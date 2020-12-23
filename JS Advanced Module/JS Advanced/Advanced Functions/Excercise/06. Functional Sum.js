function add(num) {

    function sum(x) {
        num += x;
        return sum;
    }

    sum.toString = () => num;

    return sum;
}
(add(1));
(add(1)(6)(-3));