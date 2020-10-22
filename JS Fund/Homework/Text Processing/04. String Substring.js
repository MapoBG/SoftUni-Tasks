function findWord(word, text) {
    let wordToLowerCase = word.toLowerCase();
    text = text.toLowerCase().split(" ");

    if(text.includes(wordToLowerCase)){
       return console.log(word);
    }else {
        console.log(`${word} not found!`);
    }
}
findWord('script',
'JavaScript is the best programming language'

)