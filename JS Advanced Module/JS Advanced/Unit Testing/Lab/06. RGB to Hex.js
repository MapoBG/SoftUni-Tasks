
const { expect } = require("chai");

describe("SumNumbers", () => {
    it("test1", () => {
        expect(rgbToHexColor(255, 255, 255)).to.equal("#FFFFFF");
    });

    it("test2", () => {
        expect(rgbToHexColor(["a", "a", "a"])).to.equal(undefined);
    });

    it("test3", () => {
        expect(rgbToHexColor(0, 0, 256)).to.equal(undefined);
    });

    it("test4", () => {
        expect(rgbToHexColor(256, 0, 0)).to.equal(undefined);
    });

    it("test5", () => {
        expect(rgbToHexColor(0, 256, 0)).to.equal(undefined);
    });

    it("test6", () => {
        expect(rgbToHexColor(0, -1, 0)).to.equal(undefined);
    });

    it("test7", () => {
        expect(rgbToHexColor(-1, 0, 0)).to.equal(undefined);
    });

    it("test8", () => {
        expect(rgbToHexColor(0, 0, -1)).to.equal(undefined);
    });

    it("test9", () => {
        expect(rgbToHexColor(0, 0, 0)).to.equal("#000000");
    });
});






rgbToHexColor = function (red, green, blue) {
    if (!Number.isInteger(red) || (red <= 0) || (red > 255))
        return undefined; // Red value is invalid
    if (!Number.isInteger(green) || (green <= 0) || (green > 255))
        return undefined; // Green value is invalid
    if (!Number.isInteger(blue) || (blue <= 0) || (blue > 255))
        return undefined; // Blue value is invalid
    return "#" +
        ("0" + red.toString(16).toUpperCase()).slice(-2) +
        ("0" + green.toString(16).toUpperCase()).slice(-2) +
        ("0" + blue.toString(16).toUpperCase()).slice(-2);
};