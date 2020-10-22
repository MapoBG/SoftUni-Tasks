function separateWords(input) {
    let result = ""
    let lastIndex = 0;

    for (let i = 0; i < input.length; i++) {
        let char = input[i];
        if (char.charCodeAt() > 64 && char.charCodeAt() < 91 && i != 0) {
            result += `${input.slice(lastIndex, i)}, `;
            lastIndex = i;
        }
        if(i == input.length - 1){
            result +=  `${input.slice(lastIndex)}`;
        }

    }
    console.log(result);
}
separateWords('SplitMeIfYouCanHaHaYouCantOrYouCan');