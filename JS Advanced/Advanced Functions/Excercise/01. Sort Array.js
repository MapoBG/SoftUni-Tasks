function sortArray(arr, sortType) {
    // let sorted = sortType == 'asc' ? arr.sort((a, b) => a - b) : arr.sort((a, b) => b - a);
    // return sorted;

    let sort = {
        'asc': (arr) => arr.sort((a, b) => a - b),
        'desc': (arr) => arr.sort((a, b) => b - a),
    };
    return (sort[sortType](arr));
}
sortArray([14, 7, 17, 6, 8], 'desc');