function printWords(input) {
    let text = input.split(" ");
    text = text.filter(word => word.startsWith("#") && word.length > 1)
        .map((e) => e.substring(1))
        .forEach((element) => {
            let currentWord = element.split("");
            if (currentWord.every((e) => e.charCodeAt() >= 65 && e.charCodeAt() <= 90 || e.charCodeAt() >= 97 && e.charCodeAt() <= 122)) {
                currentWord = currentWord.join("");
                console.log(currentWord);
            }
        });
}
printWords('Nowadays everyone uses # to tag a #special word in #socialMedia');