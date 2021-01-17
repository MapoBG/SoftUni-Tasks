function changeMatrix(input) {
    const matrix = [];
    let firstDiagSum = 0;
    let secondDiagSum = 0;

    input.forEach(element => {
        const row = element.split(" ").map(Number);
        matrix.push(row);
    });

    for (let i = 0; i < matrix.length; i++) {
        firstDiagSum += matrix[i][i];
        secondDiagSum += matrix[i][matrix.length - 1 - i];
    }

    if (!(firstDiagSum == secondDiagSum)) {
        matrix.forEach(row => console.log(row.join(" ")));
        return;
    }

    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        const firstDiag = `${i}${i}`;
        const secondDiag = `${[i]}${[matrix.length - 1 - i]}`;

        for (let j = 0; j < row.length; j++) {
            const elementPos = `${i}${j}`;

            if (elementPos != firstDiag && elementPos != secondDiag) {
                matrix[i][j] = firstDiagSum;
            }
        }
    }

    matrix.forEach(row => console.log(row.join(" ")));
}

changeMatrix(['5 3 12 3 1',
'11 4 23 2 5',
'101 12 3 21 10',
'1 4 5 2 2',
'5 22 33 11 1']
);