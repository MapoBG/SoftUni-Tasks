(() => {
    String.prototype.ensureStart = function (string) {
        let str = Object.values(this).join("");
        if (!str.startsWith(string)) {
            return string + str;
        }
        return str;
    }

    String.prototype.ensureEnd = function (string) {
        let str = Object.values(this).join("");
        if (!str.endsWith(string)) {
            return str + string;
        }
        return str;
    }

    String.prototype.isEmpty = function () {
        let str = Object.values(this);
        return str.length <= 0;
    }

    String.prototype.truncate = function (num) {
        let str = Object.values(this).join("");
        if (num >= str.length) {
            return str;
        } else {
            let dots = num < 4 ? ".".repeat(num) : ".".repeat(3);
            let index = str.slice(0, num).lastIndexOf(" ");
            if (index < 0) {
                str = str.substr(0, num - 3) + dots;
            } else {
                str = str.substr(0, index) + dots;
                if (str.length > num) {
                    str = str.substr(0, str.indexOf(" ")) + dots;
                }
            }

            return str;
        }
    }

    String.format = function (string, ...params) {
        for (let index in params) {
            string = string.replace(`{${index}}`, params[index]);
        }
        return string;
    }
})();

let str = 'my string';
var testString = 'the quick brown fox jumps over the lazy dog';
testString.truncate(10)
testString.truncate(25)
testString.isEmpty();
str = str.ensureStart('my');
str = str.ensureStart('hello ');
// str = str.ensureEnd('string');
// str = str.ensureEnd('!');
str = str.truncate(16);
str = str.truncate(14);
str = str.truncate(8);
str = str.truncate(4);
str = str.truncate(2);
str = String.format('The {0} {1} fox',
    'quick', 'brown');
str = String.format('jumps {0} {1}',
    'dog');

