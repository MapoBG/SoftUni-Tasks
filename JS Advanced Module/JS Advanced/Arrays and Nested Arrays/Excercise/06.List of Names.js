function printSortedArr(arr) {
    arr = arr.sort((a, b) => a.localeCompare(b));
    let num = 1;

    for (const name of arr) {
        console.log(`${num}.${name}`);
        num++;
    }
}
printSortedArr(["John", "Bob", "Christina", "Ema"]);