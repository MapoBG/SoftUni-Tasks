class Textbox {
    constructor(selector, regex) {
        this.selector = selector;
        this._elements = this._getElements(this.selector);
        this._invalidSymbols = regex;
        this._value = "";
    }

    isValid() {
        if (this.value.match(this._invalidSymbols)) {
            return false;
        } else {
            return true;
        }
    }

    _getElements(selector) {
        const elements = Array.from(document.querySelectorAll(selector));
        elements.forEach(e => e.addEventListener("focus", () => { this.onFocus(this) }));

        return elements;
    }

    onFocus(context) {
        context._elements.forEach(e => e.addEventListener("input", (e) => {
            this.value = e.target.value;
            this._elements.forEach(e => e.value = this.value);
        }));
    }

    get elements() {
        return this._elements;
    }

    set value(newValue) {
        this._elements.forEach(e => e.value = newValue);
        return this._value = newValue;
    }

    get value() {
        return this._value;
    }
}

let textbox = new Textbox(".textbox", /[^a-zA-Z0-9]/);
// let inputs = $('.textbox');

// inputs.on('input', function () { console.log(textbox.value); });
