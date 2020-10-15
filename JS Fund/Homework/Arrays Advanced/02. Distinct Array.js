function printOnlyDistinct(arr) {
    let resultArr = [];
    
    for (const num of arr) {
        if(!resultArr.includes(num)){
            resultArr.push(num);
        }
    }
    console.log(resultArr.join(" "));    
}
printOnlyDistinct([7, 8, 9, 7, 2, 3, 4, 1, 2]);