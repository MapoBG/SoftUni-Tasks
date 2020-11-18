function sumSomeNums(arr, startInd, endInd) {
    if (!Array.isArray(arr)) {
        return NaN;
    }

    if (startInd < 0) {
        startInd = 0;
    }

    let result = arr.slice(startInd, endInd + 1);

    if (result.length == 0) {
        result = [0];
    }

    result = result.map(Number).reduce((a, b) => a + b);

    return result;
}

module.exports = sumSomeNums;