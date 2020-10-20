function calcHandValue(input) {
    let playersList = {};

    input.forEach(line => {
        let [name, cards] = line.split(": ")
        cards = cards.split(", ");
        if (!playersList[name]) {
            playersList[name] = [];
        }
        playersList[name] = playersList[name].concat(cards);
    });

    let players = Object.keys(playersList);

    players.forEach(player => {
        playersList[player].forEach(card => {
            playersList[player] = playersList[player].filter(c => c != card);
            playersList[player].unshift(card);
        })
    })

    players.forEach(p => {
        playerResult = 0;
        playersList[p].forEach(c => {
            let cardType = c.split("")[c.length - 1];
            let cardValue = c.slice(0, c.length - 1);
            playerResult += calcCardValue(cardType, cardValue);
        })
        playersList[p] = playerResult;
    })

    players.forEach(pl => console.log(`${pl}: ${playersList[pl]}`));

    function calcCardValue(type, value) {
        let result = 0;

        if (!isNaN(Number(value))) {
            value = Number(value);
        } else {
            switch (value) {
                case "J":
                    value = 11;
                    break;
                case "Q":
                    value = 12;
                    break;
                case "K":
                    value = 13;
                    break;
                case "A":
                    value = 14;
                    break;
            }
        }

        switch (type) {
            case "S":
                result = value * 4;
                break;
            case "H":
                result = value * 3;
                break;
            case "D":
                result = value * 2;
                break;
            case "C":
                result = value * 1;
                break;
        }
        return result;
    }
}
calcHandValue([
    'Peter: 2C, 4H, 9H, AS, QS',
    'Tomas: 3H, 10S, JC, KD, 5S, 10S',
    'Andrea: QH, QC, QS, QD',
    'Tomas: 6H, 7S, KC, KD, 5S, 10C',
    'Andrea: QH, QC, JS, JD, JC',
    'Peter: JD, JD, JD, JD, JD, JD'
]
)