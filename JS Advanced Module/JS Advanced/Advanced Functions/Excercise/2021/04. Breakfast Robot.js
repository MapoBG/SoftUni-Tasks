function cookManager() {
    const recepies = {
        apple: {
            carbohydrate: 1,
            flavour: 2,
        },
        coke: {
            carbohydrate: 10,
            flavour: 20,
        },
        burger: {
            carbohydrate: 5,
            fat: 7,
            flavour: 3,
        },
        omelet: {
            protein: 5,
            fat: 1,
            flavour: 1,
        },
        cheverme: {
            protein: 10,
            carbohydrate: 10,
            fat: 10,
            flavour: 10,
        }
    };

    const stock = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0,
    };

    const commands = {
        restock: (microEl, qty) => {
            stock[microEl] += qty;
            return 'Success';
        },
        report: () => {
            const report = [];

            Object.keys(stock).forEach(el => report.push(`${el}=${stock[el]}`));

            return report.join(" ");
        },
        prepare: (recepie, qty) => {
            const neededIngr = recepies[recepie];

            for (const ingr in neededIngr) {
                if (stock[ingr] < neededIngr[ingr] * qty) {
                    return `Error: not enough ${ingr} in stock`;
                }
            }

            Object.keys(neededIngr).forEach(ingr => stock[ingr] -= neededIngr[ingr] * qty);

            return 'Success';
        }
    }

    return checkCommands;

    function checkCommands(params) {
        let [command, item, qty] = params.split(" ");

        return commands[command](item, Number(qty));
    }
}

let manager = cookManager();
manager("prepare cheverme 1");  // Error: not enough protein in stock
manager("restock protein 10");  // Success
manager("prepare cheverme 1");  // Error: not enough carbohydrate in stock
manager("prepare lemonade 4");  // Success
manager("prepare lemonade 4");  // Error: not enough carbohydrate in stock
manager("prepare lemonade 4");  // Error: not enough carbohydrate in stock
manager("prepare lemonade 4");  // Error: not enough carbohydrate in stock
manager("prepare lemonade 4");  // Error: not enough carbohydrate in stock
