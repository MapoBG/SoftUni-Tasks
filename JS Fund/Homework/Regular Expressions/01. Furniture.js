function calculateFurnitureCost(input) {
    let line = input.shift();
    let totalCost = 0;
    let furnitureList = [];
    let validRegEx = />>(?<furniture>[A-Za-z]+)<<(?<price>[\d]+\.?[\d]*)!(?<qty>[\d]+)/g.exec(line);

    while (line != 'Purchase') {

        if (validRegEx) {
            furnitureList.push(validRegEx.groups.furniture);
            totalCost += Number(validRegEx.groups.price) * Number(validRegEx.groups.qty);
        }
        line = input.shift();
        validRegEx = />>(?<furniture>[A-Za-z]+)<<(?<price>[\d]+\.?[\d]*)!(?<qty>[\d]+)/g.exec(line);
    }

    console.log("Bought furniture:");
    if (furnitureList.length > 0) {
        console.log(furnitureList.join("\n"));
    }
    console.log(`Total money spend: ${totalCost.toFixed(2)}`);
}
calculateFurnitureCost(['>>Sofa<<312.23!3', '>>TV<<300!5', '>Invalid<<!5', 'Purchase'])