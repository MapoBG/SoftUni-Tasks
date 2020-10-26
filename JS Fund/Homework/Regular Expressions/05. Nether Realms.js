function sortAndPrintInfo(input) {
    let inputArr = input[0].split(",");
    let demonsList = {};

    inputArr = inputArr.map(n => n.trim())
    inputArr.forEach(demon => {
        let health = demon.match(/[^\d+*\/.-]/g);
        health = calcHealth(health);
        let dmg = demon.match(/[+-]?\d+\.?\d*/g);
        let otherDmgSymb = demon.match(/[\/|*]/g);
        dmg = calcDmg(dmg, otherDmgSymb);
        demonsList[demon] = { health, dmg };
    });
    Object.keys(demonsList)
        .sort((d1, d2) => d1.localeCompare(d2))
        .forEach(d => console.log(`${d} - ${demonsList[d].health} health, ${demonsList[d].dmg} damage`));

    function calcHealth(charsArr) {
        if (charsArr) {
            charsArr = charsArr.map(c => c.charCodeAt()).reduce((a, b) => a + b);
        } else {
            charsArr = 0;
        }
        return charsArr;
    }
    function calcDmg(dmgArr, otherDmgSymbArr) {
        let result;
        if (dmgArr) {
            result = dmgArr.map(Number).reduce((a, b) => a + b);
        } else {
            result = 0;
        }

        if (otherDmgSymbArr) {
            otherDmgSymbArr.forEach(symbol => {
                if (symbol == "*") {
                    result = result * 2;
                } else if (symbol == "/") {
                    result = result / 2;
                }
            })
        }

        return result.toFixed(2);
    }
}
sortAndPrintInfo([ 'M3ph-0.5s-0.5t0.0**' ])