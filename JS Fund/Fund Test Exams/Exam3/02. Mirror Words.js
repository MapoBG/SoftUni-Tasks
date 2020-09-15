function printMirrorWords(input) {
    let pattern = /([@#])([A-Za-z]{3,})\1{2}([A-Za-z]{3,})\1/g;
    let groupMatch = pattern.exec(input);
    let wordPairsCount = 0;
    let mirrorWords = [];

    while (groupMatch) {
        let firstWord = groupMatch[2];
        let secondWord = groupMatch[3];
        let reversedSecondWord = secondWord.split("").reverse().join("");
        if (firstWord === reversedSecondWord) {
            mirrorWords.push(firstWord + " <=> " + secondWord);
            wordPairsCount++;
        } else {
            wordPairsCount++;
        }
        groupMatch = pattern.exec(input);
    }

    if (wordPairsCount === 0) {
        console.log("No word pairs found!");
    } else {
        console.log(`${wordPairsCount} word pairs found!`);
    }

    if (!mirrorWords.length) {
        console.log("No mirror words!");
    } else {
        console.log("The mirror words are:");
        console.log(mirrorWords.join(", "));
    }
}
printMirrorWords(
    [
        '@mix#tix3dj#poOl##loOp#wl@@bong&song%4very$long@thong#Part##traP##@@leveL@@Level@##car#rac##tu@pack@@ckap@#rr#sAw##wAs#r#@w1r'
    ]
)