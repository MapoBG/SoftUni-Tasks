function equalSums(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        let currentNum = arr[i];
        let sumLeft = arr.slice(0, i);
        let sumRight = arr.slice(i+1);
        if (sumLeft.length === 0) {
            sumLeft = 0;
        } else {
            sumLeft = sumLeft.reduce((a, b) => a + b);
        }
        if (sumRight.length === 0) {
            sumRight = 0;
        }
        else {
            sumRight = sumRight.reduce((a, b) => a + b);
        }
        if (sumLeft === sumRight) {
            result.push(i);
        }
    }
    if (result.length !== 0) {
        console.log(result.join(""));
    } else {
        console.log("no");
    }
}
equalSums([1, 2, 3, 3]);