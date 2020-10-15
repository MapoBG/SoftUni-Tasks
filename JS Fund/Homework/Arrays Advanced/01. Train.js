function printTrain(params) {
    let train = params.shift().split(" ").map(Number);
    let maxCapacity = Number(params.shift());

    params.forEach(com => {
        let [command, passangers] = com.split(" ");
        if (command == "Add") {
            train.push(Number(passangers));
        } else {
            for (wagonIndex in train) {
                command = Number(command);
                if (train[wagonIndex] + command <= maxCapacity) {
                    train[wagonIndex] += command;
                    break;
                }
            }
        }
    });
    console.log(train.join(" "));
}
printTrain(['32 54 21 12 4 0 23',
    '75',
    'Add 10',
    'Add 0',
    '30',
    '10',
    '75']
)