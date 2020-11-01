function add(num) {

    function sum(x = 0) {
        num += x;
        return sum;
    }
    return sum;
}
(add(1));
(add(1)(6)(-3));