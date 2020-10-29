function arrayMap(numArr, func) {
    let result = numArr.reduce((arr, num) => {
        arr.push(func(num));
        return arr;
    }, []);

    return result
}

let nums = [1, 2, 3, 4, 5];
console.log(arrayMap(nums, (item) => item * 2)); // [ 2, 4, 6, 8, 10 ]


