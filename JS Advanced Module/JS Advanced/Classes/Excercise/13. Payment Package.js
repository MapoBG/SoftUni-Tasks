class PaymentPackage {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.VAT = 20;      // Default value    
        this.active = true; // Default value
    }

    get name() {
        return this._name;
    }

    set name(newValue) {
        if (typeof newValue !== 'string') {
            throw new Error('Name must be a non-empty string');
        }
        if (newValue.length === 0) {
            throw new Error('Name must be a non-empty string');
        }
        this._name = newValue;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('Value must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('Value must be a non-negative number');
        }
        this._value = newValue;
    }

    get VAT() {
        return this._VAT;
    }

    set VAT(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('VAT must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('VAT must be a non-negative number');
        }
        this._VAT = newValue;
    }

    get active() {
        return this._active;
    }

    set active(newValue) {
        if (typeof newValue !== 'boolean') {
            throw new Error('Active status must be a boolean');
        }
        this._active = newValue;
    }

    toString() {
        const output = [
            `Package: ${this.name}` + (this.active === false ? ' (inactive)' : ''),
            `- Value (excl. VAT): ${this.value}`,
            `- Value (VAT ${this.VAT}%): ${this.value * (1 + this.VAT / 100)}`
        ];
        return output.join('\n');
    }
}

const { expect } = require("chai");

describe("Payment Package", () => {
    let instance;
    beforeEach(() => {
        instance = new PaymentPackage("Test", 100);
    });

    it("constructor", () => {
        expect(instance._name).equal("Test");
        expect(instance._value).equal(100);
        expect(instance._active).equal(true);
        expect(instance._VAT).equal(20);
    });

    it("name", () => {
        expect(instance.name).equal("Test");

        instance.name = "Pesho";

        expect(instance.name).equal("Pesho");
        expect(() => instance.name = "").to.throw("Name must be a non-empty string");
        expect(() => instance.name = 2).to.throw("Name must be a non-empty string");
    });

    it("value", () => {
        expect(instance.value).equal(100);

        instance.value = 200;

        expect(instance.value).equal(200);
        expect(() => instance.value = "a").to.throw("Value must be a non-negative number");
        expect(() => instance.value = -2).to.throw("Value must be a non-negative number");

        instance.value = 0;
        expect(() => instance.value).not.to.throw(Error);
    });

    it("VAT", () => {
        expect(instance.VAT).equal(20);

        instance.VAT = 10;

        expect(instance.VAT).equal(10);
        expect(() => instance.VAT = "a").to.throw("VAT must be a non-negative number");
        expect(() => instance.VAT = -2).to.throw("VAT must be a non-negative number");
    });

    it("active", () => {
        expect(instance.active).equal(true);

        instance.active = false;

        expect(instance.active).equal(false);
        expect(() => instance.active = NaN).to.throw("Active status must be a boolean");
    });

    it("toString", () => {
        let output = [
            `Package: Test`,
            `- Value (excl. VAT): 100`,
            `- Value (VAT 20%): 120`
        ].join("\n");

        expect(instance.toString()).equal(output);

        output = [
            `Package: Test (inactive)`,
            `- Value (excl. VAT): 100`,
            `- Value (VAT 20%): 120`
        ].join("\n");

        instance.active = false;
        expect(instance.toString()).equal(output);
    });
});