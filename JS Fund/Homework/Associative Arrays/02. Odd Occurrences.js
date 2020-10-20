function printOddWords(input) {
    input = input.toLowerCase().split(" ");
    let elements = {};

    input.forEach(element => {
        if(!elements[element]){
            elements[element] = 1
        }else {
            elements[element]++
        }
    });

    let result = [];
    Object.keys(elements).forEach(e => {
        if(elements[e] % 2 != 0){
            result.push(e);
        }
    })
    console.log(result.join(" "));
}
printOddWords('Java C# Php PHP Java PhP 3 C# 3 1 5 C#')