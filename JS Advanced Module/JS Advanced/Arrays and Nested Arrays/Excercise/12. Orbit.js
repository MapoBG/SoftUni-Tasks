function solve([width, height, x, y]) {
    let matrix = [];
    matrix[height - 1] = [];
    matrix.fill(0);
    matrix = matrix.map(e => e = []);

    matrix.forEach(row => {
        row[width - 1] = undefined;
        row.fill(undefined);
    })
    matrix[x][y] = 1;

    

    console.log(matrix.join("\n"));

}

solve([4, 4, 0, 0])