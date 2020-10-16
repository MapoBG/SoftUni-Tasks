function calcWallCost(params) {
    params = params.map(Number);
    let dailyConcreteUsage = [];

    while (params.reduce((a, b) => a + b) < params.length * 30) {
        params = buildWall(params);
    }

    let cost = dailyConcreteUsage.reduce((a, b) => a + b) * 1900;
    console.log(dailyConcreteUsage.join(", "));
    console.log(`${cost} pesos`);

    function buildWall(arr) {
        let concrete = 0;
        arr.forEach(wallSection => {
            let index = arr.indexOf(wallSection);
            if (wallSection < 30) {
                arr[index]++;
                concrete += 195;
            }
        });

        if (concrete !== 0) {
            dailyConcreteUsage.push(concrete);
        }
        return arr;
    }
}
calcWallCost([17,
    22,
    17,
    19,
    17])