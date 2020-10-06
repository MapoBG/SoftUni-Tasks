function printOddAndEvenSum(num){
    let stringFromNum = num.toString();
    let oddSum = 0;
    let evenSum = 0;

    for (let num of stringFromNum) {
        num = Number(num);
        if(num % 2 == 0){
            evenSum += num;
        }else {
            oddSum += num;
        }
    }
    console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`);
}
printOddAndEvenSum(1000435);