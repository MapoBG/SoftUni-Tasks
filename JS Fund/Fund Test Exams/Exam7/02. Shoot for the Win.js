function solve(input) {
    let targetsShot = 0;
    let targets = input.shift().split(" ").map(Number);
    let currentEl = input.shift();

    while (currentEl != 'End') {
        currentEl = Number(currentEl);
        let targetValue = targets[currentEl];
        if (targetValue != undefined && targetValue != -1) {
            targetsShot++;
            targets[currentEl] = -1;
            targets = targets.map(target => {
                if (target > targetValue) {
                   return target -= targetValue;
                } else if (target != -1) {
                    return target += targetValue;
                } else {
                    return target;
                }
            });
        }

        currentEl = input.shift()
    }
    console.log(`Shot targets: ${targetsShot} -> ${targets.join(' ')}`);
}
solve(['30 abv -12 60 54 66', "1", '2', '-1', '0', 'End'])