function recordCars(input) {
    let garage = {};

    input.forEach(line => {
        let[command, carNr] = line.split(", ");
        if(command == "IN"){
            garage[carNr] = "in";
        }else {
            delete garage[carNr];
        }
    });
    Object.keys(garage).sort((a, b) => a.localeCompare(b)).forEach(carNr => console.log(carNr));
}
recordCars(['IN, CA2844AA',
'IN, CA1234TA',
'OUT, CA2844AA',
'OUT, CA1234TA']

)