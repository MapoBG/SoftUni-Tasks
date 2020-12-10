function solve(input) {
    let line = input.shift();
    let cities = {};

    while (line != "Sail") {
        let [city, population, gold] = line.split("||");
        population = Number(population);
        gold = Number(gold);

        if (!cities[city]) {
            cities[city] = { population, gold };
        } else {
            cities[city].population += population;
            cities[city].gold += gold;
        }

        line = input.shift();
    }

    line = input.shift();

    while (line != "End") {
        let [command, city, ...rest] = line.split("=>");

        if (command == "Plunder") {
            let [people, gold] = rest;
            if (cities[city]) {
                cities[city].population -= Number(people);
                cities[city].gold -= Number(gold);
                console.log(`${city} plundered! ${gold} gold stolen, ${people} citizens killed.`);
                if (cities[city].gold <= 0 || cities[city].population <= 0) {
                    console.log(`${city} has been wiped off the map!`);
                    delete cities[city];
                }
            }
        } else if (command == "Prosper") {
            let [gold] = rest;
            gold = Number(gold);
            if (gold < 0) {
                console.log(`Gold added cannot be a negative number!`);
                line = input.shift();
                continue;
            }

            cities[city].gold += gold;
            console.log(`${gold} gold added to the city treasury. ${city} now has ${cities[city].gold} gold.`);
        }

        line = input.shift();
    }

    let sorted = Object.keys(cities)
        .sort((town1, town2) => cities[town2].gold - cities[town1].gold || town1.localeCompare(town2));

    if (sorted.length > 0) {
        console.log(`Ahoy, Captain! There are ${sorted.length} wealthy settlements to go to:`);
        sorted.forEach(town => {
            console.log(`${town} -> Population: ${cities[town].population} citizens, Gold: ${cities[town].gold} kg`);
        });
    } else {
        console.log("Ahoy, Captain! All targets have been plundered and destroyed!");
    }
}
solve([
    'Nassau||95000||1000',
    'San Juan||930000||1250',
    'Campeche||270000||690',
    'Port Royal||320000||1000',
    'Port Royal||100000||2000',
    'Sail',
    'Prosper=>Port Royal=>-200',
    'Plunder=>Nassau=>94000=>750',
    'Plunder=>Nassau=>1000=>150',
    'Plunder=>Campeche=>150000=>690',
    'End'
])