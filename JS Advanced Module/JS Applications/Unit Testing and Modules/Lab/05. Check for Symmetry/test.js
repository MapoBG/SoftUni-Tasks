const isSymmetricFun = require("./05. Check for Symmetry");
const { assert } = require("chai");
const isSymmetric = require("./05. Check for Symmetry");

describe("test symmetry function", () => {
    it("if param isn't array -> return false", () => {
        assert.equal(isSymmetric("not an array"), false);
    })

    it("if param isn't array -> return false", () => {
        assert.equal(isSymmetric(["a", "b", "a"]), true);
    })

    it("if param isn't array -> return false", () => {
        assert.equal(isSymmetric(["a", "b", "b"]), false);
    })

    it("if param isn't array -> return false", () => {
        assert.equal(isSymmetric([5]), true);
    })

    it("if param isn't array -> return false", () => {
        assert.equal(isSymmetric(["5", 5]), false);
    })
})