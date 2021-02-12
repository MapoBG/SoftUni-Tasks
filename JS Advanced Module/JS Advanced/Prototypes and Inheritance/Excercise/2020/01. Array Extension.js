(function solve() {
    Array.prototype.last = function () {
        return this[this.length - 1];
    }

    Array.prototype.skip = function (num) {
        let result = this.slice(num);
        return result;
    }

    Array.prototype.take = function (num) {
        let result = this.slice(0, num);
        return result;
    }

    Array.prototype.sum = function () {
        let result = this.reduce((a, b) => a + b);
        return result;
    }

    Array.prototype.average = function () {
        let result = this.reduce((a, b) => a + b) / this.length;
        return result;
    }
})();

var testArray = [1, 2, 3];
console.log(testArray.average());