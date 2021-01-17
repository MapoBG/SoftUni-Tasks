function extractWords(input) {
    let result = input.split(/\W/g);
    result = result.filter(x => x != "").map(x => x.toUpperCase()).join(", ");
    console.log(result);
}
extractWords('hello');