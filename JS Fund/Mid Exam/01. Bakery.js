function solve(bisquitsPerWorker, workersCount, competitorsBuisquits) {
    let bisquitsPerDay = bisquitsPerWorker * workersCount;
    let totalBisquits = 0;

    for (let i = 1; i <= 30; i++) {
        if (i % 3 == 0) {
            totalBisquits += Math.trunc(bisquitsPerDay * 0.75);
        } else {
            totalBisquits += bisquitsPerDay;
        }
    }

    console.log(`You have produced ${totalBisquits} biscuits for the past month.`);

    let percentage = (totalBisquits / competitorsBuisquits - 1) * 100;
    if (totalBisquits > competitorsBuisquits) {
        let percentage = (totalBisquits / competitorsBuisquits - 1) * 100;
        console.log(`You produce ${percentage.toFixed(2)} percent more biscuits.`);
    } else {
        percentage = Math.abs(percentage);
        console.log(`You produce ${percentage.toFixed(2)} percent less biscuits.`);
    }
}
solve(65,
    12,
    26000,
);