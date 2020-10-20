function findWordOccurances(input) {
    let words = input.shift().split(" ");
    let wordsList = {};

    words.forEach(word => {
        let occurances = input.filter(w => w == word);
        wordsList[word] = occurances.length || 0;
    })
    let sorted = Object.keys(wordsList).sort((a, b) => wordsList[b] - wordsList[a])
    sorted.forEach(w => console.log(`${w} - ${wordsList[w]}`))
}
findWordOccurances([
    'this sentence', 'In','this','sentence','you','have','to','count','the','occurances','of','the'
    ,'words','this','and','sentence','because','this','is','your','task'
    ]
    )