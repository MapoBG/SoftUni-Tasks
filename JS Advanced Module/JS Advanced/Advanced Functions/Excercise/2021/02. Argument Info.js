function solve(...params) {
    const result = new Map();
    const sortResult = {};

    params.forEach(e => {
        result.set(e, typeof e);

        if (!sortResult[typeof e]) {
            sortResult[typeof e] = [];
        }

        sortResult[typeof e].push(e);
    });

    result
        .forEach((key, value) => {
            console.log(`${key}: ${value}`);
        });

    Object.keys(sortResult)
        .sort((k1, k2) => sortResult[k2].length - sortResult[k1].length)
        .forEach(key => console.log(`${key} = ${sortResult[key].length}`));
}

solve(42, 'cat', 15, 'kitten', 'tomcat');