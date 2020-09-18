function printNrsAndSum(numStart, numEnd){
    let sum = 0;
    let allNumbers = [];

    for (let i = numStart; i <= numEnd; i++) {   
        sum += i;
        allNumbers.push(i);
    }
    console.log(allNumbers.join(" "));
    console.log(`Sum: ${sum}`);
}
printNrsAndSum(5, 10);