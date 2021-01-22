function solve(input) {
    let headings = input.shift();

    const result = input.map(row => {
        let [Town, Latitude, Longitude] = row.split("|").filter(x => x);
        Town = Town.trim();
        Longitude = Number(Number(Longitude.trim()).toFixed(2));
        Latitude = Number(Number(Latitude.trim()).toFixed(2));

        return { Town, Latitude, Longitude };
    });

    return JSON.stringify(result);
}

solve(['| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |']
);