function solve(input) {
    let text = input[0];
    let pattern = /(#|\|)(?<item>[A-Za-z ]+)\1(?<date>\d{2}\/\d{2}\/\d{2})\1(?<calories>\d{1,5})\1/g;
    let totalCalories = 0;

    let food = [...text.matchAll(pattern)];
    let foodInfo = [];

    food.forEach(item => {
        totalCalories += Number(item.groups.calories);
        foodInfo.push(`Item: ${item.groups.item}, Best before: ${item.groups.date}, Nutrition: ${item.groups.calories}`)
    })

    let daysFed = Math.floor(totalCalories / 2000);

    console.log(`You have food to last you for: ${daysFed} days!\n${foodInfo.join("\n")}`);

}
solve([
    '#Bread#19/03/21#4000#|Invalid|03/03.20||Apples|08/10/20|200||Carrots|06/08/20|500||Not right|6.8.20|5|'
]);

console.log("-----")

solve(['$$#@@%^&#Fish#24/12/20#8500#|#Incorrect#19.03.20#450|$5*(@!#Ice Cream#03/10/21#9000#^#@aswe|Milk|05/09/20|2000|']);

console.log("-----")
solve(['Hello|#Invalid food#19/03/20#450|$5*(@']);