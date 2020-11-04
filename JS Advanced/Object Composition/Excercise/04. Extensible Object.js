function solve() {
    return myObj = {
        __proto__: {},
        extend(template) {
            for (const key in template) {
                let current = template[key];
                if (typeof current == 'function') {
                    this.__proto__[key] = template[key];
                } else {
                    this[key] = current;
                }
            }
        },
    }
}

var template = {
    hair: 'blue',
    extensionMethod: function () {
        console.log("From extension method")
    }
};

var testObject = solve();
testObject.extend(template);

console.log(Object.getPrototypeOf(testObject).hasOwnProperty('extensionMethod') == true);