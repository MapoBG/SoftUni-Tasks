const { expect, closeTo } = require("chai");

describe("Math Enforcer", () => {
    describe("addFive", () => {
        it("valid input", () => {
            expect(mathEnforcer.addFive(5)).equal(10);
        });

        it("invalid input", () => {
            expect(mathEnforcer.addFive("5")).equal(undefined);
        });

        it("negative value", () => {
            expect(mathEnforcer.addFive(-5)).equal(0);
        });

        it("no input", () => {
            expect(mathEnforcer.addFive()).equal(undefined);
        });

        it("floating-point input", () => {
            expect(mathEnforcer.addFive(0.1)).equal(5.1);
        });
    });

    describe("subtractTen", () => {
        it("valid input", () => {
            expect(mathEnforcer.subtractTen(5)).equal(-5);
        });

        it("invalid input", () => {
            expect(mathEnforcer.subtractTen("5")).equal(undefined);
        });

        it("negative value", () => {
            expect(mathEnforcer.subtractTen(-5)).equal(-15);
        });

        it("no input", () => {
            expect(mathEnforcer.subtractTen()).equal(undefined);
        });

        it("floating-point input", () => {
            expect(mathEnforcer.subtractTen(10.2)).equal(0.1999999999999993);
        });
    });

    describe("sum", () => {
        it("valid input", () => {
            expect(mathEnforcer.sum(5, 5)).equal(10);
        });

        it("invalid first arg", () => {
            expect(mathEnforcer.sum("5", 5)).equal(undefined);
        });

        it("invalid second arg", () => {
            expect(mathEnforcer.sum(5, "5")).equal(undefined);
        });

        it("less than two argument", () => {
            expect(mathEnforcer.sum(5)).equal(undefined);
        });

        it("negative value", () => {
            expect(mathEnforcer.sum(-5, -5)).equal(-10);
        });

        it("no input", () => {
            expect(mathEnforcer.sum()).equal(undefined);
        });

        it("floating-point input", () => {
            expect(mathEnforcer.sum(1.3, -1.2)).equal(0.10000000000000009);
        });
    });
});


let mathEnforcer = {
    addFive: function (num) {
        if (typeof (num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof (num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof (num1) !== 'number' || typeof (num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};
