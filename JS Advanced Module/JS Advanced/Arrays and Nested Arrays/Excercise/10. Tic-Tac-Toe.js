function getResult(input) {
    let currentPlayer = "X";

    let board = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ]

    for (const coordinates of input) {
        const [x, y] = coordinates.split(" ").map(Number);

        if (board[x][y] != false) {
            console.log("This place is already taken. Please choose another!");
        } else {
            if (currentPlayer == "X") {
                board[x][y] = "X";
                currentPlayer = "O";
            } else {
                board[x][y] = "O";
                currentPlayer = "X";
            }
        }

        let result = checkGameStatus(board);

        if (result && result != "none") {
            console.log(`Player ${result} wins!`);
            board.forEach(row => console.log(row.join("\t")));
            return;
        } else if (result == "none") {
            console.log("The game ended! Nobody wins :(");
            board.forEach(row => console.log(row.join("\t")));
            return;
        }
    }

    function checkGameStatus(board) {
        let firstDiag = [];
        let secondDiag = [];
        let winner = "";

        for (let i = 0; i < board.length; i++) {
            let currentColumn = [];
            let row = board[i];
            firstDiag.push(row[i]);
            secondDiag.push(row[row.length - 1 - i]);

            if (row.every(el => checkElement(el, "X"))) {
                return winner = "X";
            } else if (row.every(el => checkElement(el, "O"))) {
                return winner = "O";
            }

            for (let j = 0; j < board.length; j++) {
                currentColumn.push(board[j][i]);

                if (currentColumn.every(el => checkElement(el, "X")) && currentColumn.length == 3) {
                    return winner = "X";
                } else if (currentColumn.every(el => checkElement(el, "O")) && currentColumn.length == 3) {
                    return winner = "O";
                }
            }
        }

        if (firstDiag.every(el => checkElement(el, "X")) || secondDiag.every(el => checkElement(el, "X"))) {
            return winner = "X";
        } else if (firstDiag.every(el => checkElement(el, "O")) || secondDiag.every(el => checkElement(el, "O"))) {
            return winner = "O";
        }

        let isBoardFull = [];

        for (let element of board) {
            if (element.includes(false)) {
                isBoardFull.push(false);
            } else {
                isBoardFull.push(true);
            }
        }

        if (isBoardFull.every(el => el == true)) {
            return winner = "none";
        }
    }

    function checkElement(el, type) {
        return el == type;
    }
}

getResult(["0 1",
    "0 0",
    "0 2",
    "2 0",
    "1 0",
    "1 1",
    "1 2",
    "2 2",
    "2 1",
    "0 0"]
);