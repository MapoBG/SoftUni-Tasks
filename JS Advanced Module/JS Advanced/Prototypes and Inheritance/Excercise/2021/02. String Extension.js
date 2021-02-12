(function solve() {
    String.prototype.ensureStart = function (str) {
        if (!this.startsWith(str)) {
            return str + this;
        }

        return this + "";
    };

    String.prototype.ensureEnd = function (str) {
        if (!this.endsWith(str)) {
            return this + str;
        }

        return this + "";
    };

    String.prototype.isEmpty = function () {
        if (this.length == 0) {
            return true;
        }

        return false;
    };

    String.prototype.truncate = function (n) {
        if (n < 4) {
            return ".".repeat(n);
        }

        if (this.length <= n) {
            return this + "";
        }

        if (this.length > n) {
            if (this.includes(" ")) {
                let result = this;

                while (result.length > n) {
                    result = result.split(" ");
                    result.pop();
                    result = result.join(" ") + "...";
                }

                return result;
            }

            return this.slice(0, n - 3) + "...";
        }
    };

    String.format = function (string, ...params) {
        let regEx = new RegExp('{(?<index>[0-9]+)}');
        let match;

        while ((match = regEx.exec(string)) != null) {
            const replacer = params[match.groups.index];

            if (replacer != undefined) {
                string = string.replace(match[0], replacer);
            } else {
                return string;
            }
        }

        return string;
    };
})();


let str = 'my string';
str = str.ensureStart('my');
str = str.ensureStart('hello ');
str = str.truncate(16);
str = str.truncate(14);
str = str.truncate(8);
str = str.truncate(4);
str = str.truncate(2);
str = String.format('The {0} {1} fox',
  'quick', 'brown');
str = String.format('jumps {0} {1}',
  'dog');