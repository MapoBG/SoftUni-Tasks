const { expect } = require("chai");

describe("EvenOrOdd", () => {
    it("return undefined", () => {
        expect(isOddOrEven(1)).to.be.undefined;
    });

    it("empty string", () => {
        expect(isOddOrEven("")).equal("even");
    });

    it("odd string", () => {
        expect(isOddOrEven("1")).equal("odd");
    });

    it("multiple strings", () => {
        expect(isOddOrEven("test", "test2")).equal("even");
    });
});

function isOddOrEven(string) {
    if (typeof (string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return "even";
    }

    return "odd";
}
