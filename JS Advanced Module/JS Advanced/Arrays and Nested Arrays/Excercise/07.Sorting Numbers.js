function sortArr(arr) {
    arr = arr.sort((a, b) => a - b);

    for (let i = 0; i < arr.length; i += 2) {
        const small = arr[i];
        const big = arr.pop();
        arr.splice(i + 1, 0, big);
    }

    return arr;
}
sortArr([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]);