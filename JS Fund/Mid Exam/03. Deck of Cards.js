function solve(input) {
    let vehiclesList = input.shift().split(", ");
    let num = Number(input.shift());

    input.forEach(line => {
        let [command, arg1, arg2] = line.split(", ");
        switch (command) {
            case 'Add':
                addCard(arg1);
                break;
            case 'Remove':
                removeCard(arg1);
                break;
            case 'Remove At':
                arg1 = Number(arg1);
                removeAt(arg1);
                break;
            case 'Insert':
                arg1 = Number(arg1);
                checkCard(arg1, arg2);
                break;
        }
    });

    console.log(vehiclesList.join(', '));

    function addCard(cardName) {
        if (vehiclesList.includes(cardName)) {
            console.log('Card is already bought');
        } else {
            console.log('Card successfully bought');
            vehiclesList.push(cardName);
        }
    }
    function removeCard(cardName) {
        if (vehiclesList.includes(cardName)) {
            console.log('Card successfully sold');
            vehiclesList = vehiclesList.filter(card => card != cardName);
        } else {
            console.log('Card not found');
        }
    }
    function removeAt(index) {
        if (index < 0 || index >= vehiclesList.length) {
            console.log('Index out of range');
        } else {
            vehiclesList.splice(index, 1);
            console.log('Card successfully sold');
        }
    }
    function checkCard(index, cardName) {
        if (index < 0 || index >= vehiclesList.length) {
            console.log('Index out of range');
        } else if (vehiclesList.includes(cardName)) {
            console.log('Card is already bought');
        } else {
            console.log('Card successfully bought');
            vehiclesList.splice(index, 0, cardName);
        }
    }
}
solve(["T 34, T 34 B, T92, AMX 13 57",
"4",
"Add, T 34",
"Remove, AMX CDC",
"Insert, 10, M60",
"Remove At, 1"])

