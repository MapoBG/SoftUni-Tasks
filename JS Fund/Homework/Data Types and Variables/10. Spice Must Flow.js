function calcTotalSpiceAmount(startingYield) {
    let daysCount = 0;
    let totalSpice = 0;

    for (let i = startingYield; i >= 100; i -= 10) {
        let minedSpice = i;
        daysCount++;
        totalSpice += i;
        if (minedSpice >= 26) {
            totalSpice -= 26;
        } else {
            totalSpice -= minedSpice;
        }
    }
    
    if (totalSpice >= 26) {
        totalSpice -= 26;
    } else {
        totalSpice = 0;
    }
    console.log(daysCount);
    console.log(totalSpice)
}
calcTotalSpiceAmount(111);