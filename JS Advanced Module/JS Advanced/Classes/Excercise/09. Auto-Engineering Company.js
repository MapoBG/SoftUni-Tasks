function solve(input) {
    const producedCars = new Map();

    input.forEach(line => {
        let [brand, model, qty] = line.split(" | ");
        qty = Number(qty);

        if (!producedCars.has(brand)) {
            producedCars.set(brand, new Map());
        }

        if (!producedCars.get(brand).has(model)) {
            producedCars.get(brand).set(model, qty);
        } else {
            producedCars.get(brand).set(model, producedCars.get(brand).get(model) + qty);
        }
    });

    producedCars.forEach((models, brand) => {
        console.log(brand);
        models.forEach((qty, model) => {
            console.log(`###${model} -> ${qty}`);
        });
    });
}

solve(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10']);