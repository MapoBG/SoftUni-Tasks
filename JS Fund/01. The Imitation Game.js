function decryptMsg(input) {
    let message = input[0];
    let currentLine = input.shift();

    while (currentLine !== "Decode") {
        let [command, pattern, value] = currentLine.split("|");
        switch (command) {
            case "Move":
                pattern = Number(pattern);
                message = message.split("");
                let cutString = message.splice(0, pattern);
                message = message.concat(cutString)
                    .join("");
                break;

            case "Insert":
                pattern = Number(pattern);
                message = message.split("");
                message.splice(pattern, 0, value)
                message = message.join("");
                break;

            case "ChangeAll":
                while (message.indexOf(pattern) > -1) {
                    message = message.replace(pattern, value)
                }
                break;
        }
        currentLine = input.shift();
    }
    console.log(`The decrypted message is: ${message}`);
}
decryptMsg(['..Hez', 'ChangeAll|.|z', 'Insert|2|o', 'Move|3', 'Decode']);