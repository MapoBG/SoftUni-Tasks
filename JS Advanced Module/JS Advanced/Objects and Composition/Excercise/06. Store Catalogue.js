function solve(input) {
    const result = {};

    input.forEach(productInfo => {
        let [product, price] = productInfo.split(" : ");
        price = Number(price);
        const firstLetter = product[0];

        if (!result[firstLetter]) {
            result[firstLetter] = {};
        }

        if (!result[firstLetter][product]) {
            result[firstLetter][product] = price;
        }
    });

    Object
        .keys(result)
        .sort((a, b) => a.localeCompare(b))
        .forEach(capLetter => {
            console.log(capLetter);
            Object.keys(result[capLetter]).sort((a, b) => a.localeCompare(b)).forEach(product => {
                console.log(`  ${product}: ${result[capLetter][product]}`);
            })
        });
}

solve(['Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10']);