function getIncreaseingNums(arr) {
    let biggestNum = Number.MIN_SAFE_INTEGER;
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        const currNum = arr[i];
        if(currNum >= biggestNum){
            result.push(currNum);
            biggestNum = currNum;
        }
    }

    return result;
}
console.log(getIncreaseingNums([20, 
    3, 
    2, 
    15,
    6, 
    1]
    ));