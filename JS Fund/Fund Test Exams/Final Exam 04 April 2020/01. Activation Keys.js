function solve(input) {
    let activationKey = input.shift();
    let currentLine = input.shift();

    while (currentLine != "Generate") {
        let [command, ...rest] = currentLine.split(">>>");

        switch (command) {
            case "Contains":
                let [substring] = rest;
                if (activationKey.includes(substring)) {
                    console.log(`${activationKey} contains ${substring}`);
                } else {
                    console.log("Substring not found!");
                }
                break;

            case "Flip": {
                let [type, startIndex, endIndex] = rest;
                let changedSubstr = activationKey.slice(startIndex, endIndex);
                if (type == "Upper") {
                    changedSubstr = changedSubstr.toUpperCase();
                } else if (type == "Lower") {
                    changedSubstr = changedSubstr.toLowerCase();
                }
                activationKey = activationKey.split("");
                activationKey.splice(startIndex, changedSubstr.length, changedSubstr);
                activationKey = activationKey.join("");
                console.log(activationKey);
            }
                break;

            case "Slice":
                let [startIndex, endIndex] = rest;
                activationKey = activationKey.split("");
                activationKey.splice(startIndex, endIndex - startIndex);
                activationKey = activationKey.join("");
                console.log(activationKey);
                break;
        }

        currentLine = input.shift();
    }

    console.log(`Your activation key is: ${activationKey}`);
}
solve([
    '134softsf5ftuni2020rockz42',
    'Slice>>>3>>>7',
    'Contains>>>-rock',
    'Contains>>>-uni-',
    'Contains>>>-rocks',
    'Flip>>>Upper>>>2>>>8',
    'Flip>>>Lower>>>5>>>11',
    'Generate'
  ]);