function returnNthElementFromArray(arr, n) {
    let result = [];

    for (let i = 0; i < arr.length; i += n) {
        const element = arr[i];
        result.push(element);
    }
    return result;
}
console.log(returnNthElementFromArray(['1', 
'2',
'3', 
'4', 
'5'], 
6
));