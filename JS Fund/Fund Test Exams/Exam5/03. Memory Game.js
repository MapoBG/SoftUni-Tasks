function memoryGame(input) {
    let sequence = input.shift().split(" ")
    let borderIndex = sequence.length - 1;
    let pair = input.shift();
    let movesCount = 0;

    while (pair != 'end') {
        pair = pair.split(" ").map(Number);
        let [p1, p2] = pair;
        movesCount++;

        if (p1 == p2 || p1 < 0 || p2 < 0 || p1 > borderIndex || p2 > borderIndex) {
            console.log(`Invalid input! Adding additional elements to the board`);
            let punishEl = `-${movesCount}a`;
            let enterIndex = sequence.length / 2;
            sequence.splice(enterIndex, 0, punishEl, punishEl);
        } else if (sequence[p1] == sequence[p2]) {
            console.log(`Congrats! You have found matching elements - ${sequence[p1]}!`);
            delete sequence[p1];
            delete sequence[p2];
            sequence = sequence.filter(e => e != undefined);
        } else {
            console.log("Try again!");
        }

        if (sequence.length == 0) {
            break;
        }
        borderIndex = sequence.length - 1;
        pair = input.shift();
    }

    if (pair != 'end') {
        console.log(`You have won in ${movesCount} turns!`);
    } else {
        console.log(`Sorry you lose :(\n${sequence.join(' ')}`);
    }
}
memoryGame([
    "1 1 2 2 3 3 4 4 5 5",
    "1 1",
    "-1 0",
    "1 0",
    "1 0",
    "1 0",
    "end"
]
)