function printCryptedMsg(input) {
    let concealedMsg = input.shift();
    let line = input.shift();

    while (line !== "Reveal") {
        let [command, ...rest] = line.split(":|:");
        switch (command) {
            case "InsertSpace":
                let index = Number(rest);
                concealedMsg = concealedMsg.slice(0, index) + " " + concealedMsg.slice(index);
                console.log(concealedMsg);
                break;

            case "Reverse":
                let stringToFind = rest.join("");
                let reversedString = "";
                if (concealedMsg.includes(stringToFind)) {
                    concealedMsg = concealedMsg.replace(stringToFind, "");
                    reversedString = stringToFind.split("")
                        .reverse()
                        .join("");
                    concealedMsg = concealedMsg.concat(reversedString);
                    console.log(concealedMsg);
                } else {
                    console.log("error");
                }
                break;

            case "ChangeAll":
                let [stringToReplace, replacement] = [...rest];
                if (stringToReplace !== replacement && !stringToReplace.includes(replacement)) {
                    while (concealedMsg.includes(stringToReplace)) {
                        concealedMsg = concealedMsg.replace(stringToReplace, replacement);
                    }
                } else if (stringToReplace.includes(replacement)) {
                    concealedMsg = concealedMsg.replace(stringToReplace, replacement);
                }
                console.log(concealedMsg);
                break;
        }
        line = input.shift();
    }
    console.log(`You have a new text message: ${concealedMsg}`);
}
printCryptedMsg([
    'heVVodar!gniV',
    'ChangeAll:|:V:|:l',
    'Reverse:|:!gnil',
    'InsertSpace:|:5',
    'Reveal'
]
);