function isNumPerfect(num) {
    let numbers = [];

    for (let index = 1; index < num; index++) {
        if (num % index == 0)
            numbers.push(index);
    }
    numbers = numbers.reduce((a, b) => a + b);
    if(numbers ===  num){
        console.log("We have a perfect number!");
    }else {
        console.log("It's not so perfect.");
    }
}
isNumPerfect(1236498);