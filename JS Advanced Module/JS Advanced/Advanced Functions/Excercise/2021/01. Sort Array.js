function solve(arr, string) {
    const sort = {
        asc: (arr) => arr.sort((a, b) => a - b),
        desc: (arr) => arr.sort((a, b) => b - a),
    }

    return sort[string](arr);
}

solve([14, 7, 17, 6, 8], 'desc');