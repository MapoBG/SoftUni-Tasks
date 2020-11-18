function Card (face, suit) {
    let validFaces = ["2", "3", "4", "5", "6", "7", "8", '9', "10", "J", "Q", "K", "A"];
    let validSuits = ["S", "H", "D", "C"];
    let suitsCodes = { S: 9824, H: 9829, D: 9830, C: 9827 };
    face = setface(face);
    suit = setSuit(suit)

    function setface(face) {
        if (!validFaces.includes(face)) {
            console.log(`Invalid card: ${face}${suit}`);
            throw new Error(`Invalid card: ${face}${suit}`);
        }
        return face;
    }

    function setSuit(suit) {
        if (!validSuits.includes(suit)) {
            console.log(`Invalid card: ${face}${suit}`);
            throw new Error(`Invalid card: ${face}${suit}`);
        }
        return suit;
    }

    function toString() {
        let result = face + String.fromCharCode(suitsCodes[suit]);
        return result;
    }

    return {toString};
}

module.exports = Card;