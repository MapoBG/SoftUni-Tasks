function printBombSum(numArr, arr2) {
    let bombNum = arr2[0];
    let bombPow = arr2[1];

    for (let index = 0; index < numArr.length; index++) {
        let num = numArr[index];
        if (num == bombNum) {
            let startIndex = Number(index) - bombPow;
            let deleteCount = 2 * bombPow + 1;
            if (startIndex < 0) {
                deleteCount = (2 * bombPow + 1) + startIndex;
                startIndex = 0;
            }
            numArr.splice(startIndex, deleteCount);
            index = -1;
        }
    }

    if (numArr.length < 1) {
        numArr = [0];
    }
    console.log(numArr.reduce((a, b) => a + b));
}
printBombSum([1, 9, 4, 2, 9, 8, 1],
    [9, 3]
)