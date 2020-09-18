function printPassword(input) {
    let cryptedPassword = input.shift();
    let line = input.shift();

    while (line !== "Done") {
        let [command, ...rest] = line.split(" ");
        switch (command) {
            case "TakeOdd":
                let password = "";
                for (let i = 0; i < cryptedPassword.length; i++) {
                    let letter = cryptedPassword[i];
                    if (i % 2 !== 0) {
                        password += letter;
                    }
                }
                cryptedPassword = password;
                console.log(cryptedPassword);
                break;

            case "Cut":
                let [index, length] = [...rest];
                index = Number(index);
                length = Number(length);
                let stringToReplace = cryptedPassword.slice(index, index + length);
                cryptedPassword = cryptedPassword.replace(stringToReplace, "");
                console.log(cryptedPassword);
                break;

            case "Substitute":
                let [substring, substitute] = [...rest];
                if (cryptedPassword.includes(substring)) {
                    while (cryptedPassword.includes(substring)) {
                        cryptedPassword = cryptedPassword.replace(substring, substitute);
                    }
                    console.log(cryptedPassword);
                } else {
                    console.log("Nothing to replace!");
                }
                break;
        }

        line = input.shift();
    }
    console.log(`Your password is: ${cryptedPassword}`);
}
printPassword([
    'up8rgoyg3r1atmlmpiunagt!-irs7!1fgulnnnqy',
    'TakeOdd',
    'Cut 18 2',
    'Substitute ! ***',
    'Substitute ? .!.',
    'Done'
  ]
);