function argumentInfo() {
    let argInfo = {};
    // key word 'arguments' - currenly used for params;
    Array.from(arguments).forEach(e => {
        let type = typeof e;
        console.log(`${type}: ${e}`);
        if (!argInfo[type]) {
            argInfo[type] = 0;
        }
        argInfo[type] += 1;
    });
    Object.entries(argInfo)
        .sort((a, b) => b[1] - a[1])
        .forEach(e => console.log(`${e[0]} = ${e[1]}`));
}
argumentInfo('cat', 42, function () { console.log('Hello world!'); })