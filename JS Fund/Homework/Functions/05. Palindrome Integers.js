function checkPalindrom(params) {

    for (let number of params) {
        let numArr = [];
        let stringNr = number.toString();
        for (let num of stringNr) {
            numArr.push(num);
        }
        numArr = Number(numArr.reverse().join(""));
        if (number === numArr){
            console.log('true');
        }else {
            console.log('false');
        }
    }
}
checkPalindrom([32,2,232,1010]);