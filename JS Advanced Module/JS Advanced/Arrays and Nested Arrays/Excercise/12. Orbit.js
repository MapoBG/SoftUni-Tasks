function solve([width, height, x, y]) {
    let matrix = [];
    matrix.length = height;
    matrix = matrix.fill([]);

    matrix.forEach(row => {
        row.length = width;
        row = row.fill(undefined)
    })



    console.log();
    matrix[x][y] = 1;
    console.log();
}

solve([4, 4, 0, 0])