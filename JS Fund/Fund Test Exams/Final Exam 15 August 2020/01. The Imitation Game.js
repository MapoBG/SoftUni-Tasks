function solve(input) {
    let decodedMsg = input.shift();
    let currentLine = input.shift();
    let actions = {
        Move(decodedMsg, number) {
            let letters = decodedMsg.substring(0, number);
            decodedMsg = decodedMsg.substring(number);

            return decodedMsg.concat(letters)
        },
        Insert(decodedMsg, index, value) {
            decodedMsg = decodedMsg.split("");
            decodedMsg.splice(index, 0, value);

            return decodedMsg.join("");
        },
        ChangeAll(decodedMsg, substring, replacement) {

            while (decodedMsg.includes(substring)) {
                decodedMsg = decodedMsg.replace(substring, replacement);
            }

            return decodedMsg;
        },
    }

    while (currentLine != "Decode") {
        let [command, arg1, arg2] = currentLine.split("|");

        decodedMsg = actions[command](decodedMsg, arg1, arg2);

        currentLine = input.shift();
    }

    console.log(`The decrypted message is: ${decodedMsg}`);
}
solve(['HelloHello', 'ChangeAll|el|hel', 'Decode']);

console.log("-----");

solve([
    'owyouh',
    'Move|2',
    'Move|3',
    'Insert|3|are',
    'Insert|9|?',
    'Decode'
]);