const createCalculator = require("./07. Add or Subtract");
const { assert, expect } = require("chai");

describe("test createCalculator()", () => {

    let result;

    beforeEach(() => {
        result = createCalculator();
    });

    it("should return 5 with result.get()", () => {
        let value = result.get();
        assert.equal(value, 0);
    });

    it("should return 5 with result.get()", () => {
        result.add(5);
        let value = result.get(); 
        assert.equal(value, 5);
    });

    it("should return -5 with result.get()", () => {
        result.subtract(5);
        let value = result.get(); 
        assert.equal(value, -5);
    });

    it("should return 5 with result.get()", () => {
        result.add(-5.5);
        result.subtract(-0.5);
        result.add("5");
        result.subtract("5");
        let value = result.get();
        assert.equal(value, -5);
    });
})