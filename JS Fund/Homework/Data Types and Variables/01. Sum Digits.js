function sumAllDigits(num){
    num = num.toString();
    result = 0;
    for (let i = 0; i < num.length; i++) {
        let number = Number(num[i]);
        result+= number
    }
    console.log(result);
}
sumAllDigits(245678);