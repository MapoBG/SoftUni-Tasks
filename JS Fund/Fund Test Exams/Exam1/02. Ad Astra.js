function foodList(input) {
    let correctPattern = /([#|\|])(?<item>[A-Za-z\s]+)\1(?<date>[\d]{2}\/[\d]{2}\/[\d]{2})\1(?<calories>[\d]+)\1/g;
    let calories = 0;
    let products = {};
    let itemNr = 1;
    let match;

    while (match = correctPattern.exec(input)) {
        if (!products.hasOwnProperty(itemNr)) {
            products[itemNr] = {
                item: match.groups.item,
                date: match.groups.date,
                calories: match.groups.calories,
            }
        }
        itemNr++;
        calories += Number(match.groups.calories);
    }
    let daysWithFood = calories / 2000;

    console.log(`You have food to last you for: ${Math.floor(daysWithFood)} days!`);

    for (let key in products) {
        console.log(`Item: ${products[key].item}, Best before: ${products[key].date}, Nutrition: ${products[key].calories}`);
    }
}
foodList([
    '#Bread#19/03/21#4000#|Invalid|03/03.20||Bread|08/10/20|200||Bread|06/08/20|500||Not right|6.8.20|5|'
]);