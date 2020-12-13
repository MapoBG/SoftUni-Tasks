function solve([number, ...inputs]) {
    let pattern = /(.+)>(?<numbers>\d{3})\|(?<letters>[a-z]{3})\|(?<bigLetters>[A-Z]{3})\|(?<symbols>[^<>]{3})<\1/;
    let password = "";

    for (let i = 0; i < number; i++) {
        let element = inputs[i];
        let currentPass = [...element.matchAll(pattern)];
        if (currentPass.length == 0) {
            console.log("Try another password!");
            continue;
        }

        currentPass = currentPass[0];
        password = currentPass.groups.numbers + currentPass.groups.letters + currentPass.groups.bigLetters + currentPass.groups.symbols;
        console.log(`Password: ${password}`);
    };

};

solve([
    '3',
    '##>00|no|NO|!!!?<###',
    '##>123|yes|YES|!!!<##',
    '$$<111|noo|NOPE|<<>$$'
]);

console.log("-----");

solve([
    '5',
    'aa>111|mqu|BAU|mqu<aa',
    '()>111!aaa!AAA!^&*<()',
    'o>088|abc|AAA|***<o',
    'asd>asd|asd|ASD|asd<asd',
    '*>088|zzzz|ZzZ|123<*'
]);