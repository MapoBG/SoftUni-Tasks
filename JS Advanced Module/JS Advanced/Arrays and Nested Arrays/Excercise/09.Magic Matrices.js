function checkMatrix(input) {
    const magicNum = input[0].reduce((a, b) => a + b);
    let isMagical = true;
    let firstCol = 0;
    let secondCol = 0;
    let thirdCol = 0;

    for (const row of input) {
        let result = row.reduce((a, b) => a + b);
        if (result != magicNum) {
            console.log(false);
            return;
        }
    }

    input.forEach(array => {
        firstCol += array[0];
        secondCol += array[1];
        thirdCol += array[2];
    });

    isMagical = magicNum == firstCol && magicNum == secondCol && magicNum == thirdCol;
    console.log(isMagical);
}
checkMatrix(
    [[11, 32, 45],
    [21, 0, 1],
    [21, 1, 1]]     
)

// function diagonalSums(input) {

//     let firstDiagonal = 0;

//     let secondDiagonal = 0;

//     let firstIndex = 0;

//     let secondIndex = input[0].length - 1;

//     input.forEach(array => {

//         firstDiagonal += array[firstIndex++];

//         secondDiagonal += array[secondIndex--];

//     });

//     console.log(firstDiagonal + ' ' + secondDiagonal);

// }
// diagonalSums([[3, 5, 17], [-1, 7, 14], [1, -8, 89]])