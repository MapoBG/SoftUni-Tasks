function sortCatalogue(input) {
    let catalogue = {};

    input.forEach(line => {
        let [product, price] = line.split(" : ");
        if (!catalogue[product[0]]) {
            catalogue[product[0]] = [];
        }
        catalogue[product[0]].push(`  ${product}: ${Number(price)}`)
    });

    let sorted = Object.keys(catalogue).sort((a, b) => a.localeCompare(b));
    sorted.forEach(p => {
        catalogue[p].sort((a, b) => a.localeCompare(b));
        console.log(`${p}\n${catalogue[p].join("\n")}`);
    });
}
sortCatalogue([
    'Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10'
])