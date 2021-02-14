const { expect } = require("chai");

describe("Tests …", function () {
    describe("TODO …", function () {

        it("makeAnOrder", function () {
            expect(pizzUni.makeAnOrder({ orderedPizza: "the name of the pizza", orderedDrink: "the name of the drink" })).equal("You just ordered the name of the pizza and the name of the drink.");
            expect(() => pizzUni.makeAnOrder({ orderedDrink: "the name of the drink" })).to.throw("You must order at least 1 Pizza to finish the order.");
            expect(() => pizzUni.makeAnOrder("1")).to.throw("You must order at least 1 Pizza to finish the order.");
        });

        it("getRemainingWork", function () {
            expect(pizzUni.getRemainingWork([{ pizzaName: "the name of the pizza", status: "ready" }, { pizzaName: "the name of the pizza 2", status: "preparing" }])).equal("The following pizzas are still preparing: the name of the pizza 2.");
            expect(pizzUni.getRemainingWork([{ pizzaName: "the name of the pizza", status: "preparing" }, { pizzaName: "the name of the pizza 2", status: "preparing" }])).equal("The following pizzas are still preparing: the name of the pizza, the name of the pizza 2.");
            expect(pizzUni.getRemainingWork([{ pizzaName: "the name of the pizza", status: "ready" }, { pizzaName: "the name of the pizza 2", status: "ready" }])).equal("All orders are complete!");
        });

        it("orderType", function () {
            expect(pizzUni.orderType(100, "Carry Out")).equal(90);
            expect(pizzUni.orderType(100, "Delivery")).equal(100);
        });
    });
});


let pizzUni = {
    makeAnOrder: function (obj) {

        if (!obj.orderedPizza) {
            throw new Error('You must order at least 1 Pizza to finish the order.');
        } else {
            let result = `You just ordered ${obj.orderedPizza}`
            if (obj.orderedDrink) {
                result += ` and ${obj.orderedDrink}.`
            }
            return result;
        }
    },

    getRemainingWork: function (statusArr) {

        const remainingArr = statusArr.filter(s => s.status != 'ready');

        if (remainingArr.length > 0) {

            let pizzaNames = remainingArr.map(p => p.pizzaName).join(', ')
            let pizzasLeft = `The following pizzas are still preparing: ${pizzaNames}.`

            return pizzasLeft;
        } else {
            return 'All orders are complete!'
        }

    },

    orderType: function (totalSum, typeOfOrder) {
        if (typeOfOrder === 'Carry Out') {
            totalSum -= totalSum * 0.1;

            return totalSum;
        } else if (typeOfOrder === 'Delivery') {

            return totalSum;
        }
    }
}