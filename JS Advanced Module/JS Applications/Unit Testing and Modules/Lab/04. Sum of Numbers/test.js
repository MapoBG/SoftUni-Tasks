const sum = require("./04. Sum of Numbers");
const { assert } = require("chai");

describe("test sum function", () => {
    it("test sum result", () => {
        assert.equal(sum([2, 3]), 5);
    })

    it("test sum result", () => {
        assert.equal(sum(["2", 3]), 5);
    })

    it("test sum result", () => {
        assert.equal(isNaN(sum(['test', 3])), true);
    })
})