function generatePassword(input) {
    let concatenatedWord = input[0].concat(input[1]);
    let thirdWord = input[2];

    for (let j = 0; j <= thirdWord.length; j++) {

        for (let i = 0; i < concatenatedWord.length; i++) {
            const char = concatenatedWord[i];
            if (char == "o" || char == "a" || char == "e" || char == "i" || char == "u") {
                let replacingChar = thirdWord[j].toUpperCase();
                concatenatedWord = concatenatedWord.replace(char, replacingChar);
                j++;
            }
            if (j == thirdWord.length) {
                j = 0;
            }
        }
        break;
    }
    let password = concatenatedWord.split("").reverse().join("");
    console.log(`Your generated password is ${password}`);
}
generatePassword([
    'areyousureaboutthisone', 'notquitebutitrustyou', 'disturbed'
    ]
    );