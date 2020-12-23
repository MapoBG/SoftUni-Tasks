function modifyObj(input) {
    let carsList = {};
    function carBuilder() {
        return {
            create: (name) => carsList[name] = {},
            inherit: (newCar, parentCar) => carsList[newCar] = Object.create(carsList[parentCar]),
            set: (name, key, value) => carsList[name][key] = value,
            print: (name) => {
                let result = [];
                for (let key in carsList[name]) {
                    result.push(`${key}:${carsList[name][key]}`)
                }
                console.log(result.join(", "));
            }
        }
    }
    let constructor = carBuilder();

    return input.map(line => line.split(" "))
        .forEach(([command, ...arg]) => {
            if (arg.includes('inherit')) {
                arg = arg.filter(e => e != 'inherit');
                constructor.inherit(...arg);
            } else {
                constructor[command](...arg);
            }
        })
}
modifyObj(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']
)