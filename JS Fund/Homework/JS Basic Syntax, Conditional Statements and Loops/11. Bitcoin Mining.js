function calculateBitcoins(input) {
    let bitcoins = 0;
    let levs = 0;
    let daysCoinsBought = [];

    for (let i = 0; i < input.length; i++) {
        let gold = input[i];
        if ((i + 1) % 3 === 0) {
            levs += (gold * 0.7) * 67.51;
        } else {
            levs += gold * 67.51;
        }

        if (levs >= 11949.16) {
            let currentBitcoins = Math.trunc(levs / 11949.16);
            daysCoinsBought.push(i + 1);
            levs -= 11949.16 * currentBitcoins;
            bitcoins += currentBitcoins;
        }
    }

    console.log(`Bought bitcoins: ${bitcoins}`);
    if (daysCoinsBought.length > 0) {
        console.log(`Day of the first purchased bitcoin: ${daysCoinsBought[0]}`);
    }
    console.log(`Left money: ${levs.toFixed(2)} lv.`);
}
calculateBitcoins([100, 200, 300]);