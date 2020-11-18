const rgbToHexColor = require("./06. RGB to Hex");
const { assert, expect } = require("chai");

describe("test rgbToHexColor(p1, p2, p3)", () => {
    it("should return undefined, if any param is anything but number", () => {
        assert.equal(rgbToHexColor("red", 5, 5), undefined);
    })

    it("should return undefined, if any param value is less than 0", () => {
        assert.equal(rgbToHexColor(5, -5, 5), undefined);
    })

    it("should return undefined, if any param value is bigger than 255", () => {
        assert.equal(rgbToHexColor(5, 5, 256), undefined);
    })

    it("should return undefined, if any param value is not an integer", () => {
        assert.equal(rgbToHexColor(5.5, 5, 256), undefined);
    })

    it("should return undefined, if param is missing", () => {
        assert.equal(rgbToHexColor(5, 5), undefined);
    })

    it("should return undefined, if no param is given", () => {
        assert.equal(rgbToHexColor(), undefined);
    })

    it('should return undefined for ("5", [3], {8:9})', function () {
        expect(rgbToHexColor("5", [3], {8:9})).to.be.equal(undefined);
    });

    it("should return result, if params are OK", () => {
        assert.equal(rgbToHexColor(255, 5, 5), '#FF0505');
    })
})