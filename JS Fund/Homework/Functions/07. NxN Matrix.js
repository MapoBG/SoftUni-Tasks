function printNumMatrix(num) {
    for (let index = 0; index < num; index++) {
        let stringNum = num.toString() + " ";
        console.log(stringNum.repeat(num));
        
    }
}
printNumMatrix(7);
