const { expect } = require("chai");

describe("Char Lookup", () => {
    it("valid input", () => {
        expect(lookupChar("1", 0)).equal("1");
    });

    it("valid input with more chars", () => {
        expect(lookupChar("lorem ipsum", 5)).equal(" ");
    });

    it("faulty first arg", () => {
        expect(lookupChar(0, 0)).equal(undefined);
    });

    it("faulty second arg", () => {
        expect(lookupChar("1", "0")).equal(undefined);
    });

    it("faulty second arg", () => {
        expect(lookupChar("1", 3.2)).equal(undefined);
    });

    it("index out of range", () => {
        expect(lookupChar("0", -1)).equal("Incorrect index");
    });

    it("index out of range", () => {
        expect(lookupChar("0", 2)).equal("Incorrect index");
    });
});


function lookupChar(string, index) {
    if (typeof (string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}
