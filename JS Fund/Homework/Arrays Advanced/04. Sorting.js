function sorting(params) {
    let sorted = params.sort((a, b) => b - a);

    for (let i = 0; i < sorted.length; i += 2) {
        let num = sorted.pop()
        sorted.splice(i + 1, 0, num)

    }
    console.log(sorted.join(" "));
}
sorting([1, 21, 3, 52, 69, 63, 31, 2, 18, 94])