function calcWallCost(params) {
    params = params.map(Number);
    let dailyConcreteUsage = [];

    while (params.length > 0) {
        let concrete = 0;
        for (let i = 0; i < params.length; i++) {
            let wallSection = params[i];
            let index = params.indexOf(wallSection);
            if (wallSection == 30) {
                params.splice(index, 1);
                i--;
            } else {
                params[index]++;
                concrete += 195;
            }
        }

        if(concrete !== 0){
            dailyConcreteUsage.push(concrete);
        }
    }
    let cost = dailyConcreteUsage.reduce((a, b) => a + b) * 1900;
    console.log(dailyConcreteUsage.join(", "));
    console.log(`${cost} pesos`);
}
calcWallCost([17,
    22,
    17,
    19,
    17])