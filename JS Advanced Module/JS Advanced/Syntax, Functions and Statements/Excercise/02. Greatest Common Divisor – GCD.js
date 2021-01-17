function getBiggestCommonDivisor(a, b) {

    while (b) {
        let c = b;
        b = a % b;
        a = c;
    }
    console.log(a);
}
getBiggestCommonDivisor(15, 5);