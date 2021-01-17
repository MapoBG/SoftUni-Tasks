function printInfo(fruit, weight, cost) {
    weight /= 1000;
    const money = weight * cost;

    console.log(`I need $${money.toFixed(2)} to buy ${weight.toFixed(2)} kilograms ${fruit}.`);
}
printInfo('apple', 1563, 2.35)