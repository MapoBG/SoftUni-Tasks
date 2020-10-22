function sortDestinations(input) {
    let destinationList = {};
    input.forEach(line => {
        let [country, city, cost] = line.split(" > ");
        if (!destinationList[country]) {
            destinationList[country] = {};
        }
        if (!destinationList[country][city]) {
            destinationList[country][city] = Number(cost);
        } else {
            destinationList[country][city] = Math.min(cost, destinationList[country][city]);
        }
    });
    Object.keys(destinationList)
        .sort((a, b) => a.localeCompare(b))
        .forEach((country) => {
            let destinations = Object.entries(destinationList[country])
                .sort((a, b) => a[1] - (b[1]))
                .join(" ").split(",").join(" -> ")
            console.log(`${country} -> ${destinations}`);
        })
}
sortDestinations([
    'Bulgaria > Sofia > 25000',
    'Bulgaria > Sofia > 25000',
    'Kalimdor > Orgrimar > 25000',
    'Albania > Tirana > 25000',
    'Bulgaria > Aarna > 25010',
    'Bulgaria > Lukovit > 10',
]
)