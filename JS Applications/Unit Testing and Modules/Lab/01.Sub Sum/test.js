const sumFun = require("./01.Sub Sum");
const assert = require("chai").assert;

describe("test Sum Nums", () => {
    it("check if input param1 is array", () => {
        assert(isNaN(sumFun(['true'], 0, 0)));
    });
})
