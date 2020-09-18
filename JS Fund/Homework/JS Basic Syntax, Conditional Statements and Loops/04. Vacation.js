function caclculateTotalPrice(menQty, groupType, day) {
    let price = 0;

    switch (day) {
        case "Friday":
            if (groupType === "Students") {
                price = 8.45;
            }
            if (groupType === "Business") {
                price = 10.90;
            }
            if (groupType === "Regular") {
                price = 15;
            }
            break;
        case "Saturday":
            if (groupType === "Students") {
                price = 9.80;
            }
            if (groupType === "Business") {
                price = 15.60;
            }
            if (groupType === "Regular") {
                price = 20;
            }
            break;
        case "Sunday":
            if (groupType === "Students") {
                price = 10.46;
            }
            if (groupType === "Business") {
                price = 16;
            }
            if (groupType === "Regular") {
                price = 22.50;
            }
            break;
    }

    if (menQty > 29 && groupType === "Students") {
        price *= 0.85;
    } else if (menQty > 99 && groupType === "Business") {
        menQty -= 10;
    } else if (menQty > 9 && menQty <= 20 && groupType === "Regular") {
        price *= 0.95;
    }

    let result = menQty * price;
    console.log(`Total price: ${result.toFixed(2)}`);
}
caclculateTotalPrice(40,
    "Regular",
    "Saturday"
);
