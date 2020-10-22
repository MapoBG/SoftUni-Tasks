function fillLetter(input) {
    let text = input[0];
    let missingWords = input[1].sort((w1, w2) => w2.length - w1.length);
    while (text.includes("_")) {
        missingWords.forEach(word => {
           text = text.replace("_".repeat(word.length), word);
        });
    }
    console.log(text);   
}
fillLetter(['Hi, grandma! I\'m so ____ to write to you. ______ the winter vacation, so _______ things happened. My dad bought me a sled. Mom started a new job as a __________. My brother\'s ankle is ________, and now it bothers me even more. Every night Mom cooks ___ on your recipe because it is the most delicious. I hope this year Santa will _____ me a robot.',
['pie', 'bring', 'glad', 'During', 'amazing', 'pharmacist', 'sprained']]
)