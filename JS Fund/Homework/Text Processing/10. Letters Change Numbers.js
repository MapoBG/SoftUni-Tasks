function sum(string) {
    let stringArr = string.split(" ");
    let alphabet = generateAlphabet();
    let result = 0;

    stringArr.filter(el => el!= "").forEach(e => {
        let firstLetter = e[0];
        let secondLetter = e[e.length - 1];
        let number = Number(e.slice(1, e.length - 1));
        result += calcValue(firstLetter, secondLetter, number);
    });

    console.log(result.toFixed(2));

    function calcValue(firstLetter, lastLetter, num) {
        let result = 0;
        let firstLetterCharValue = firstLetter.charCodeAt();
        let lastLetterCharValue = lastLetter.charCodeAt();

        if(firstLetterCharValue < 91){
            result += num / alphabet[firstLetter];
        }else {
            result += num * alphabet[firstLetter.toUpperCase()];
        }

        if(lastLetterCharValue < 91){
            result -= alphabet[lastLetter];
        }else {
            result += alphabet[lastLetter.toUpperCase()];
        }
        return result;
    }

    function generateAlphabet() {
        let counter = 1;
        let alphabet = {};

        for (let i = 65; i < 91; i++) {
            let letter = String.fromCharCode(i);
            alphabet[letter] = counter;
            counter++;
        }
        return alphabet;
    }
}
sum('a1A');