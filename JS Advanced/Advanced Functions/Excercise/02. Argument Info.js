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
    Object.keys(argInfo)
        .sort((t1, t2) => argInfo[t2] - argInfo[t1])
        .forEach(e => console.log(`${e} = ${argInfo[e]}`));
}
argumentInfo('cat', 42, 56, function () { console.log('Hello world!'); })