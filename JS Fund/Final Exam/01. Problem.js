function solve(input) {
    let text = input.shift();
    let commands = {
        Replace(text, char, newChar) {
            while (text.includes(char)) {
                text = text.replace(char, newChar);
            }

            console.log(text);
            return text;
        },
        Cut(text, startIndex, endIndex) {
            if (startIndex < 0 || endIndex >= text.length) {
                console.log("Invalid indices!");
                return text;
            }
            [endIndex, startIndex] = [Number(endIndex), Number(startIndex)];
            text = text.split("");
            text.splice(startIndex, ((endIndex - startIndex) + 1));
            text = text.join("");
            console.log(text);
            return text;
        },
        Make(text, type) {
            if (type == "Lower") {
                text = text.toLocaleLowerCase();
                console.log(text);
                return text;
            } else if (type == "Upper") {
                text = text.toLocaleUpperCase();
                console.log(text);
                return text;
            }
        },
        Check(text, string) {
            if (text.includes(string)) {
                console.log(`Message contains ${string}`);
                return text;
            } else {
                console.log(`Message doesn't contain ${string}`);
                return text;
            }
        },
        Sum(text, startIndex, endIndex) {
            if (startIndex < 0 || endIndex >= text.length) {
                console.log("Invalid indices!");
                return text;
            }

            [endIndex, startIndex] = [Number(endIndex), Number(startIndex)];
            let sum = 0;
            let substring = text.slice(startIndex, endIndex + 1);
            for (let i = 0; i < substring.length; i++) {
                let char = substring[i];
                sum += char.charCodeAt();
            }

            console.log(sum);
            return text;
        },
    };

    let currentLine = input.shift();

    while (currentLine != "Finish") {
        let [command, arg1, arg2] = currentLine.split(" ");

        text = commands[command](text, arg1, arg2);

        currentLine = input.shift();
    }
}

solve([
    'ILikeSharan',
    'Replace a e',
    'Make Upper',
    'Check SHEREN',
    'Sum 1 4',
    'Cut 1 4',
    'Finish'
]);

console.log(("-----"));

solve([
    'HappyNameDay',
    'Replace p r',
    'Make Lower',
    'Cut 2 23',
    'Sum -2 2',
    'Finish'
]);

console.log(("-----"));

solve([
    'DinnerIsServed',
    'Make Upper',
    'Check Dinner',
    'Replace N M',
    'Finish'
]);