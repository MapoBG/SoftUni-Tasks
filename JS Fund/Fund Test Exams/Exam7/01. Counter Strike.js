function solve(input) {
    let inputArr = input.map(Number);
    let initEnergy = inputArr.shift();
    let curDistance = inputArr.shift();
    let battlesWon = 0;

    while (!isNaN(curDistance)) {
        if (initEnergy >= curDistance) {
            battlesWon++;
            initEnergy -= curDistance;
        } else {
            console.log(`Not enough energy! Game ends with ${battlesWon} won battles and ${initEnergy} energy`);
            return;
        }
        
        if (battlesWon % 3 == 0) {
            initEnergy += battlesWon;
        }

        curDistance = inputArr.shift();
    }

    if (initEnergy >= 0) {
        console.log(`Won battles: ${battlesWon}. Energy left: ${initEnergy}`);
    }
}
solve(['200', '1', '1', '1', '200', "1", 'End of battle'])