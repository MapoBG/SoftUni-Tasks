const cardFun = require("C:/Users/mapob/OneDrive/Desktop/Programming/SoftUni-Tasks/JS Applications/Unit Testing and Modules/Lab/02. Playing Cards/02. Playing Cards")

function printDeckOfCards(cards) {
    let result = [];
    cards.forEach(card => {
        card = card.split("");
        let suit = card.pop();
        let face = card.join("");
        result.push(cardFun(face, suit).toString());
    })

    console.log(result.join(" "));
}
printDeckOfCards(['5S', '3D', 'QD', '1C'])