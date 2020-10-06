function printMissingChars(char1, char2){
    let lowerASCIIValue = Math.min(char1.charCodeAt(), char2.charCodeAt());
    let higherASCIIValue = Math.max(char1.charCodeAt(), char2.charCodeAt());
    let missingCharsList = [];
    
    for (let index = lowerASCIIValue + 1; index < higherASCIIValue; index++) {
        let char = String.fromCharCode(index);
        missingCharsList.push(char);
    }
    console.log(missingCharsList.join(" "));
}
printMissingChars('C',
'#'

)