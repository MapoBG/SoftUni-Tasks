function solve(input) {
    let targets = input.shift().split(" ").map(Number);
    let curLine = input.shift();

    while (curLine != 'End') {
        let [command, index, num] = curLine.split(" ");
        index = Number(index);
        num = Number(num);
        switch (command) {
            case 'Shoot':
                shoot(targets, index, num);
                break;
            case 'Add':
                add(targets, index, num);
                break;
            case 'Strike':
                strike(targets, index, num);
                break;
        }

        curLine = input.shift();
    }

    console.log(targets.join("|"));

    function shoot(targetsArr, index, power) {
        if (targetsArr[index]) {
            targetsArr[index] -= power;
        }
        if (targetsArr[index] <= 0) {
            targetsArr.splice(index, 1);
        }
        return targetsArr;
    }
    function add(targetsArr, index, value) {
        if (targetsArr[index]) {
            targetsArr.splice(index, 0, value);
        } else {
            console.log(`Invalid placement!`);
        }
        return targetsArr;
    }
    function strike(targetsArr, index, radius) {
        let strikeStart = index - radius;
        let strikeEnd = index + radius;
        if (targetsArr[index] && targetsArr[strikeStart] && targetsArr[strikeEnd]) {
            let bombBlast = 1 + radius * 2;
            targetsArr.splice(strikeStart, bombBlast);
        } else {
            console.log(`Strike missed!`);
        }
        return targetsArr;
    }
}
solve([
    '47 55 85 78 99 20',
    'Shoot 1 55',
    'Shoot 8 15',
    'Strike 2 3',
    'Add 0 22',
    'Add 2 40',
    'Add 2 50',
    'End'
  ])