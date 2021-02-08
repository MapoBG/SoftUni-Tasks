StringBuilder = class StringBuilder {
    constructor(string) {
        if (string !== undefined) {
            StringBuilder._vrfyParam(string);
            this._stringArray = Array.from(string);
        } else {
            this._stringArray = [];
        }
    }

    append(string) {
        StringBuilder._vrfyParam(string);
        for (let i = 0; i < string.length; i++) {
            this._stringArray.push(string[i]);
        }
    }

    prepend(string) {
        StringBuilder._vrfyParam(string);
        for (let i = string.length - 1; i >= 0; i--) {
            this._stringArray.unshift(string[i]);
        }
    }

    insertAt(string, startIndex) {
        StringBuilder._vrfyParam(string);
        this._stringArray.splice(startIndex, 0, ...string);
    }

    remove(startIndex, length) {
        this._stringArray.splice(startIndex, length);
    }

    static _vrfyParam(param) {
        if (typeof param !== 'string') throw new TypeError('Argument must be string');
    }

    toString() {
        return this._stringArray.join('');
    }
};


const { expect } = require("chai");

describe("StringBuilder", () => {
    let instance;
    beforeEach(() => instance = new StringBuilder());

    it("constructor", () => {
        expect(instance._stringArray).to.deep.equal([]);

        instance = new StringBuilder("a");
        expect(instance._stringArray).to.deep.equal(["a"]);

        expect(() => new StringBuilder(2)).to.throw("Argument must be string");
    });

    it("append", () => {
        instance.append("abv");
        expect(instance._stringArray).to.deep.equal(["a", "b", "v"]);

        instance.append("g");
        expect(instance._stringArray).to.deep.equal(["a", "b", "v", "g"]);
    });

    it("prepend", () => {
        instance.prepend("abv");
        expect(instance._stringArray).to.deep.equal(["a", "b", "v"]);

        instance.prepend("g");
        expect(instance._stringArray).to.deep.equal(["g", "a", "b", "v"]);
    });

    it("insertAt", () => {
        instance.insertAt("xcbgda", 5);
        expect(instance._stringArray[2]).equal("b");
    });

    it("remove", () => {
        instance.append("abv");
        instance.remove(1, 1);
        expect(instance._stringArray).to.deep.equal(["a", "v"]);
    });

    it("toString", () => {
        instance.append("abv");
        expect(instance.toString()).equal("abv");
    });

    it("vrfyParam", () => {
        expect(() => instance.append(2)).to.throw("Argument must be string");
        expect(() => instance.prepend(2)).to.throw("Argument must be string");
        expect(() => instance.insertAt(2, 2)).to.throw("Argument must be string");
    });
});