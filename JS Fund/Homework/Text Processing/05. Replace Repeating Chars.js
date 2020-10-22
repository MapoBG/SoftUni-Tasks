function replaceRepeatingChars(input) {
    let result = "";

    for (let char of input) {
        if(!result.endsWith(char)){
            result += char;
        }
    }
    console.log(result);
}
replaceRepeatingChars('aaaaabbbbbcdddeeeedssaa')