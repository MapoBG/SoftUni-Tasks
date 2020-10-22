function printResources(input) {
    let resourcesList = {};

    input.forEach((element, index) => {
        if (index % 2 == 0) {
            if (!resourcesList[element]) {
                resourcesList[element] = Number(input[index + 1]);
            } else {
                resourcesList[element] += Number(input[index + 1]);
            }
        }
    });
    Object.keys(resourcesList).forEach(resource => console.log(`${resource} -> ${resourcesList[resource]}`))
}
printResources([
    'gold',
    '155',
    'silver',
    '10',
    'copper',
    '17',
    'gold',
    '15'
    ]
    
)