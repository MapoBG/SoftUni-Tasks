function solve(input) {
    const engines = {
        small: { power: 90, volume: 1800 },
        normal: { power: 120, volume: 2400 },
        monster: { power: 200, volume: 3500 }
    };

    if (input.power <= 90) {
        input.engine = engines.small;
    } else if (input.power <= 120) {
        input.engine = engines.normal;
    } else if (input.power <= 200) {
        input.engine = engines.monster;
    }

    if (input.carriage == "hatchback") {
        input.carriage = {
            type: "hatchback",
            color: input.color,
        };
    } else {
        input.carriage = {
            type: "coupe",
            color: input.color,
        };
    }

    let wheelSize = input.wheelsize % 2;

    if (wheelSize == 0) {
        wheelSize = Math.floor(input.wheelsize - 1);
    } else {
        wheelSize = Math.floor(input.wheelsize);
    }

    input.wheels = [wheelSize, wheelSize, wheelSize, wheelSize];

    delete input.power;
    delete input.color;
    delete input.wheelsize;

    return input;
}

solve({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
});