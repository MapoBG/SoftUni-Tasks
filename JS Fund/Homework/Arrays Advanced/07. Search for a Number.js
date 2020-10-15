function searchNumber(arr1, arr2) {
    let result = arr1.slice(0, arr2[0]);
    result.splice(0, arr2[1]);
    result = result.filter(x => x == arr2[2]);
    if(result.length < 1){
        console.log(`Number ${arr2[2]} occurs 0 times.`);
    } else {
        console.log(`Number ${arr2[2]} occurs ${result.length} times.`);
    }
}
searchNumber([5, 2, 3, 4, 1, 6],
    [5, 2, 7]
    )