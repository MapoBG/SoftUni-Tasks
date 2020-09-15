function printSortedCarList(input) {
    let n = input.shift();
    let carList = {};
    for (let i = 0; i < n; i++) {
        let carInfo = input.shift();
        let [carBrand, mileage, fuel] = carInfo.split("|");
        mileage = Number(mileage);
        fuel = Number(fuel);
        carList[carBrand] = {
            mileage,
            fuel,
        }
    }

    let line = input.shift();
    while (line !== "Stop") {
        let [command, carBrand, ...info] = line.split(" : ");
        if (carList[carBrand]) {
            switch (command) {
                case "Drive":
                    info = info.map(x => Number(x));
                    let [distance, fuel] = [...info];
                    if (carList[carBrand].fuel < fuel) {
                        console.log("Not enough fuel to make that ride");
                    } else {
                        carList[carBrand].mileage += distance;
                        carList[carBrand].fuel -= fuel;
                        console.log(`${carBrand} driven for ${distance} kilometers. ${fuel} liters of fuel consumed.`);
                    }
                    if (carList[carBrand].mileage >= 100000) {
                        console.log(`Time to sell the ${carBrand}!`);
                        delete carList[carBrand];
                    }
                    break;

                case "Refuel":
                    let refill = Number(info);
                    if (carList[carBrand].fuel + refill > 75) {
                        console.log(`${carBrand} refueled with ${75 - carList[carBrand].fuel} liters`);
                        carList[carBrand].fuel = 75;
                    } else {
                        carList[carBrand].fuel += refill;
                        console.log(`${carBrand} refueled with ${refill} liters`);
                    }
                    break;

                case "Revert":
                    let kilometers = Number(info);
                    carList[carBrand].mileage -= kilometers;
                    if (carList[carBrand].mileage < 10000) {
                        carList[carBrand].mileage = 10000;
                    } else {
                        console.log(`${carBrand} mileage decreased by ${kilometers} kilometers`);
                    }
                    break;
            }
        }
        line = input.shift();
    }

    let sortedCars = Object.keys(carList)
        .sort((a, b) => carList[b].mileage - carList[a].mileage || a.localeCompare(b));

    for (let car of sortedCars) {
        console.log(`${car} -> Mileage: ${carList[car].mileage} kms, Fuel in the tank: ${carList[car].fuel} lt.`);
    }
}
printSortedCarList([
    '4',
    'Lamborghini Veneno',
    'Bugatti Veyron|12345|67',
    'Koenigsegg CCXR|67890|12',
    'Aston Martin Valkryie|99900|50',
    'Drive : Koenigsegg CCXR : 382 : 82',
    'Drive : Aston Martin Valkryie : 99 : 23',
    'Drive : Aston Martin Valkryie : 2 : 1',
    'Refuel : Lamborghini Veneno : 40',
    'Revert : Bugatti Veyron : 2000',
    'Stop'
]
);