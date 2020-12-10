function solve(text) {
    let emojiExp = /(:{2}|\*{2})[A-Z]{1}[a-z]{2,}\1/g;

    let emojis = text[0].match(emojiExp) || [];
    let coolFactor = text[0].match(/[0-9]/g).reduce((a, b) => a * b);
    let coolEmojis = [];

    emojis.forEach(emoji => {
        cleanEmoji = emoji.slice(2, emoji.length - 2);
        let wordValue = 0;
        cleanEmoji.split("")
            .forEach(letter => {
                wordValue += letter.charCodeAt();
            })
        if (wordValue > coolFactor) {
            coolEmojis.push(emoji);
        }
    })

console.log(`Cool threshold: ${coolFactor}`);
console.log(`${emojis.length} emojis found in the text. The cool ones are:\n${coolEmojis.join("\n")}`);

}
solve([
    "1"
])