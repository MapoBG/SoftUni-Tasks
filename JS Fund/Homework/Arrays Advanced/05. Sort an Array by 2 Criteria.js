function sortArray(params) {
    let sorted = params.sort((a, b) => a.length - b.length || a.localeCompare(b));
    console.log(sorted.join('\n'));
}
sortArray(["Isacc", "Theodor", "Jack", "Harrison", "George"]);