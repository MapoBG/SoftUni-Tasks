const {expect} = require ("chai");

function solve() {
    return myObj = {
        __proto__: {},
        extend: function (template) {
            for (const key in template) {
                if (typeof template[key] == "function") {
                    Object.getPrototypeOf(this)[key] = template[key];
                } else {
                    this[key] = template[key];
                }
            }
        }
    }
}

// const obj = solve();
// const template = {
//     extensionMethod: function () {},
//     extensionProperty: 'someString'
// };
// obj.extend(template);

var template = {
    extensionMethod: function () {
        console.log("From extension method")
    }
};

var testObject = solve();
testObject.extend(template);
expect(Object.getPrototypeOf(testObject).hasOwnProperty('extensionMethod')).to.equal(true, "Object's prototype was not extended");