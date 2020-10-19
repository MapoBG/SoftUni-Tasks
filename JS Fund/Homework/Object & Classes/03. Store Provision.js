function printStock(stock, orderedProducts) {
    let currentStock = {};

    stock.forEach((e, index) => {
        if (index % 2 == 0) {
            if (!currentStock[e]) {
                currentStock[e] = Number(stock[index + 1]);
            } else {
                currentStock[e] += Number(stock[index + 1]);
            }
        }
    });

    orderedProducts.forEach((e, index) => {
        if (index % 2 == 0) {
            if (!currentStock[e]) {
                currentStock[e] = Number(orderedProducts[index + 1]);
            } else {
                currentStock[e] += Number(orderedProducts[index + 1]);
            }
        }
    });

    Object.keys(currentStock)
        .forEach(product => console.log(`${product} -> ${currentStock[product]}`));
}
printStock([
    'Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'
],
    [
        'Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30'
    ]

)