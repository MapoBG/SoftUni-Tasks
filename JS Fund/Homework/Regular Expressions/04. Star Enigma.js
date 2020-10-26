function printInfo(input) {
    let linesNr = input[0];
    let lines = input.slice(1, linesNr + 1);
    let result = lines.map(line => decryptMsg(line));
    let attacked = [];
    let destroyed = [];

    result.forEach(command => {
        let validCommand = /@(?<planet>[A-Za-z]+)[^@!:>-]*:(?<population>[\d]+)[^@!:>-]*!(?<attack>[A|D])![^@!:>-]*->(?<soldiers>[\d]+)/.exec(command);
        if (validCommand) {
            if (validCommand.groups.attack == 'A') {
                attacked.push(validCommand.groups.planet);
            } else {
                destroyed.push(validCommand.groups.planet);
            }
        }
    })
    if (attacked.length) {
        console.log(`Attacked planets: ${attacked.length}`);
        attacked.sort((a, b) => a.localeCompare(b)).forEach(p => {
            console.log(`-> ${p}`);
        })
    } else {
        console.log(`Attacked planets: 0`);
    }
    if (destroyed.length) {
        console.log(`Destroyed planets: ${destroyed.length}`);
        destroyed.sort((a, b) => a.localeCompare(b)).forEach(p => {
            console.log(`-> ${p}`);
        })
    } else {
        console.log(`Destroyed planets: 0`);
    }

    function decryptMsg(text) {
        let decryptNr = text.match(/[SsTtAaRr]/g);
        if (!decryptNr) {
            decryptNr = 0;
        } else {
            decryptNr = decryptNr.length;
        }
        let result = text.split("");
        result = result.map(x => x = decryptChar(x, decryptNr));
        return result.join("");
    }
    function decryptChar(char, num) {
        charCode = char.charCodeAt() - num;
        char = String.fromCharCode(charCode);
        return char;
    }
}
printInfo([
    '3',
    "tt(''DGsvywgerx>6444444444%H%1B9444",
    'GQhrr|A977777(H(TTTT',
    'EHfsytsnhf?8555&I&2C9555SR'
  ]);