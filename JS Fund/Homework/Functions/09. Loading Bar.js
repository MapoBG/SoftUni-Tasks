function printLoadingBar(num) {
    let bar = "%".repeat(num / 10);
    let missing = ".".repeat(10 - (num/10));
    if (num < 100) {
        console.log(`${num}% [${bar}${missing}]\nStill loading...`);
    }else {
        console.log(`${num}% Complete!\n[${bar}${missing}]`);
    }
}
printLoadingBar(100);