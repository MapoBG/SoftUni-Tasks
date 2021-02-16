class ChristmasDinner {
    constructor(budget) {
        this.budget = budget;
        this.dishes = [];
        this.products = [];
        this.guests = {};
    }

    set budget(value) {
        if (value < 0) {
            throw new Error("The budget cannot be a negative number");
        }

        return this._budget = value;
    }

    get budget() {
        return this._budget;
    }

    shopping([product, price]) {
        if (this.budget < price) {
            throw new Error("Not enough money to buy this product");
        }

        this.products.push(product);
        this.budget -= price;

        return `You have successfully bought ${product}!`;
    }

    recipes(recipe) {
        recipe.productsList.forEach(product => {
            if (!this.products.includes(product)) {
                throw new Error("We do not have this product");
            }
        });

        this.dishes.push(recipe);

        return `${recipe.recipeName} has been successfully cooked!`;
    }

    inviteGuests(name, dish) {

        if (!this.dishes.find(d => d.recipeName == dish)) {
            throw new Error("We do not have this dish");
        }

        if (this.guests[name]) {
            throw new Error("This guest has already been invited");
        }

        this.guests[name] = dish;

        return `You have successfully invited ${name}!`;
    }

    showAttendance() {
        let result = "";

        for (const guest in this.guests) {
            let dishProducts;
            const dish = this.guests[guest];

            this.dishes.forEach(d => {
                if (d.recipeName == dish) {
                    dishProducts = d.productsList.join(", ");
                }
            });

            result += `${guest} will eat ${dish}, which consists of ${dishProducts}\n`;
        }

        return result.trim();
    }
}

let dinner = new ChristmasDinner(300);

dinner.shopping(['Salt', 1]);
dinner.shopping(['Beans', 3]);
dinner.shopping(['Cabbage', 4]);
dinner.shopping(['Rice', 2]);
dinner.shopping(['Savory', 1]);
dinner.shopping(['Peppers', 1]);
dinner.shopping(['Fruits', 40]);
dinner.shopping(['Honey', 10]);

dinner.recipes({
    recipeName: 'Oshav',
    productsList: ['Fruits', 'Honey']
});
dinner.recipes({
    recipeName: 'Folded cabbage leaves filled with rice',
    productsList: ['Cabbage', 'Rice', 'Salt', 'Savory']
});
dinner.recipes({
    recipeName: 'Peppers filled with beans',
    productsList: ['Beans', 'Peppers', 'Salt']
});

dinner.inviteGuests('Ivan', 'Oshav');
dinner.inviteGuests('Petar', 'Folded cabbage leaves filled with rice');
dinner.inviteGuests('Georgi', 'Peppers filled with beans');

console.log(dinner.showAttendance());