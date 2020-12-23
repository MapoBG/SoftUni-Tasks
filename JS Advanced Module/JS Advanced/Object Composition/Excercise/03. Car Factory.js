function carCreator(carObj) {
    let newCarObj = {};
    Object.assign(newCarObj, carObj);

    let storage = {
        smallEngine: { power: 90, volume: 1800 },
        normalEngine: { power: 120, volume: 2400 },
        monsterEngine: { power: 200, volume: 3500 },
        hatchback: { type: 'hatchback', color: '' },
        coupe: { type: 'coupe', color: '' },
    }
    getEngine(newCarObj);
    getCoupeType(newCarObj);
    getWheels(newCarObj);
    return newCarObj

    function getEngine(newCar) {
        newCarObj.engine = {};

        if (newCar.power <= 90) {
            Object.assign(newCarObj.engine, storage.smallEngine);
        } else if (newCar.power <= 120) {
            Object.assign(newCarObj.engine, storage.normalEngine);
        } else {
            Object.assign(newCarObj.engine, storage.monsterEngine);
        }

        delete newCar.power;

        return newCar;
    }

    function getCoupeType(newCar) {
        if (newCar.carriage == 'hatchback') {
            newCarObj.carriage = {};
            Object.assign(newCarObj.carriage, storage.hatchback);
        } else if (newCar.carriage == 'coupe') {
            newCarObj.carriage = {};
            Object.assign(newCarObj.carriage, storage.coupe);
        }

        newCar.carriage.color = newCar.color;

        delete newCar.color;

        return newCar;
    }
    function getWheels(newCar) {
        newCar.wheels = [0, 0, 0, 0];
        let wheelSize = newCar.wheelsize;

        if (wheelSize % 2 == 0) {
            newCar.wheels.fill(--wheelSize, 0, 4);
        } else {
            newCar.wheels.fill(wheelSize, 0, 4);
        }

        delete newCar.wheelsize;

        return newCar;
    }
}
carCreator({ model: 'VW Golf II',
power: 90,
color: 'blue',
carriage: 'hatchback',
wheelsize: 14 }


)