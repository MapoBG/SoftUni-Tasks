function printDeckOfCards(cards) {
    let result = [];
    cards.forEach(card => {
        card = card.split("");
        let suit = card.pop();
        let face = card.join("");
        result.push(Card(face, suit).toString());
    })

    if (!result.includes("invalid")) {
        console.log(result.join(" "));
    }

    function Card(face, suit) {
        let validFaces = ["2", "3", "4", "5", "6", "7", "8", '9', "10", "J", "Q", "K", "A"];
        let validSuits = ["S", "H", "D", "C"];
        let suitsCodes = { S: 9824, H: 9829, D: 9830, C: 9827 };
        face = setface(face);
        suit = setSuit(suit)

        function setface(face) {
            if (!validFaces.includes(face)) {
                console.log(`Invalid card: ${face}${suit}`);
                return "invalid";
            }
            return face;
        }

        function setSuit(suit) {
            if (!validSuits.includes(suit)) {
                console.log(`Invalid card: ${face}${suit}`);
                return "invalid";
            }
            return suit;
        }

        function toString() {
            if (face == "invalid" || suit == "invalid") {
                return "invalid";
            }
            let result = face + String.fromCharCode(suitsCodes[suit]);
            return result;
        }

        return {toString };
    }
}
printDeckOfCards(['AS', '10D', 'KH', '2C'])