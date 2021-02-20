const { expect } = require("chai");

describe("Tests …", function () {
    describe("dealership", function () {

        it("powNumber", function () {
            expect(numberOperations.powNumber(10)).equal(100);
            expect(numberOperations.powNumber(0)).equal(0);
            expect(numberOperations.powNumber(-10)).equal(100);
        });

        it("numberChecker", function () {
            expect(() => numberOperations.numberChecker("a")).to.throw("The input is not a number!");
            expect(numberOperations.numberChecker("-10")).equal("The number is lower than 100!");
            expect(numberOperations.numberChecker(100)).equal("The number is greater or equal to 100!");
            expect(numberOperations.numberChecker(101)).equal("The number is greater or equal to 100!");
        });

        it("sumArrays", function () {
            expect(numberOperations.sumArrays([1], [3])).to.deep.equal([4]);
            expect(numberOperations.sumArrays([1, 2], [3])).to.deep.equal([4, 2]);
            expect(numberOperations.sumArrays([1], [2, 3, 4])).to.deep.equal([3, 3, 4]);
        });
    });
});

const numberOperations = {
    powNumber: function (num) {
        return num * num;
    },
    numberChecker: function (input) {
        input = Number(input);

        if (isNaN(input)) {
            throw new Error('The input is not a number!');
        }

        if (input < 100) {
            return 'The number is lower than 100!';
        } else {
            return 'The number is greater or equal to 100!';
        }
    },
    sumArrays: function (array1, array2) {

        const longerArr = array1.length > array2.length ? array1 : array2;
        const rounds = array1.length < array2.length ? array1.length : array2.length;

        const resultArr = [];

        for (let i = 0; i < rounds; i++) {
            resultArr.push(array1[i] + array2[i]);
        }

        resultArr.push(...longerArr.slice(rounds));

        return resultArr
    }
};