function ladybugs(input) {
    let fieldSize = input.shift();
    let intialBugPlaces = input
        .shift()
        .split(" ")
        .map(x => Number(x));
    let field = [];

    // create & populate the field with bugs;
    for (let i = 0; i < fieldSize; i++) {
        field.push(0);
    }

    for (let place of intialBugPlaces) {
        if (place < fieldSize) {
            field[place] = 1;
        }
    }

    // bugs flying around;
    for (let line of input) {
        let [bugIndex, direction, length] = line.split(" ");
        bugIndex = Number(bugIndex);
        length = Number(length);

        if (bugIndex < field.length && field[bugIndex] === 1) {
            field[bugIndex] = 0;
            if (direction == "left") {
                let landingTile = (bugIndex - length);
                while (landingTile >= 0 && field[landingTile] === 1) {
                    landingTile -= length;
                }
                if (landingTile >= 0) {
                    field[landingTile] = 1;
                }
            } else if (direction == "right") {
                let landingTile = (bugIndex + length);
                while (landingTile < field.length && field[landingTile] === 1) {
                    landingTile += length;
                }
                if (landingTile < field.length) {
                    field[landingTile] = 1;
                }
            }
        }
    }
    console.log(field.join(" "));
}

ladybugs([5, '3',
    '3 left 2',
    '1 left -2']

)