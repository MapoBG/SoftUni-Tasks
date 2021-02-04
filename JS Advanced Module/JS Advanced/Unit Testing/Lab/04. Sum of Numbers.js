const { expect } = require("chai");

describe("SumNumbers", () => {
    it("test1", () => {
        expect(sum([1])).to.equal(1);
    });

    it("test1", () => {
        expect(sum([1, 2, 3])).to.equal(6);
    });
});

function sum(arr) {
    let sum = 0;
    for (let num of arr) {
        sum += Number(num);
    }
    return sum;
}
