function calcPrice(input) {
    let totalPrice = 0;
    let currentEl = input.shift();

    while (currentEl != 'special' && currentEl != 'regular') {
        currentEl = Number(currentEl);
        if (currentEl <= 0) {
            console.log('Invalid price!');
        } else {
            totalPrice += currentEl;
        }
        currentEl = input.shift();
    }

    if (totalPrice == 0) {
        console.log("Invalid order!");
    } else if (currentEl == 'special') {
        let specialTotalPrice = (totalPrice * 1.2) * 0.90;
        console.log(`Congratulations you've just bought a new computer!
Price without taxes: ${totalPrice.toFixed(2)}$
Taxes: ${(totalPrice * 0.2).toFixed(2)}$
        -----------
Total price: ${specialTotalPrice.toFixed(2)}$`);
    } else {
        let regularTotalPrice = totalPrice * 1.2;
        console.log(`Congratulations you've just bought a new computer!
Price without taxes: ${totalPrice.toFixed(2)}$
Taxes: ${(totalPrice * 0.2).toFixed(2)}$
        -----------
Total price: ${regularTotalPrice.toFixed(2)}$`);
    }
}
calcPrice([
    'regular'
]

)