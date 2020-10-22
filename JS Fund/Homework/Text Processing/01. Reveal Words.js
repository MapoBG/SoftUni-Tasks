function replaceWordsInText(words, text) {
    words = words.split(", ");
    while (text.includes("*")) {
        words.forEach(word => {

            text = text.replace("*".repeat(word.length), word);
        });
    }
    console.log(text);
}
replaceWordsInText('learning, great',
    'softuni is ***** place for ******** new programming languages'
)