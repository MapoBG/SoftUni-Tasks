const { expect } = require("chai");

describe("CheckForSymetry", () => {
    it("test1", () => {
        expect(isSymmetric([1, 2, 1])).to.equal(true);
    });

    it("test2", () => {
        expect(isSymmetric("1")).to.equal(false);
    });

    it("test3", () => {
        expect(isSymmetric([1, 2, 3])).to.equal(false);
    });

    it("test4", () => {
        expect(isSymmetric(["1", 1])).to.equal(false);
    });
});

function isSymmetric(arr) {
    if (!Array.isArray(arr)) {
        return false; // Non-arrays are non-symmetric
    }
    let reversed = arr.slice(0).reverse(); // Clone and reverse
    let equal = (JSON.stringify(arr) == JSON.stringify(reversed));
    return equal;
}
