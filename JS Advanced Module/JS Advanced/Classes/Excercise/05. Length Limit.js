class Stringer {
    constructor(string, stringLength) {
        this.innerString = string;
        this.innerLength = stringLength;
    }

    increase(length) {
        this.innerLength += length;

        if (this.innerLength < 0) {
            this.innerLength = 0;
        }
    }

    decrease(length) {
        this.innerLength -= length;

        if (this.innerLength < 0) {
            this.innerLength = 0;
        }
    }

    toString() {
        if (this.innerLength == 0) {
            return ".".repeat(3);
        } else if (this.innerString.length > this.innerLength) {
            return this.innerString.slice(0, this.innerString.length - this.innerLength) + ".".repeat(3);
        }
        return this.innerString;
    }
}

let test = new Stringer("Test", 5);
console.log(test.toString()); // Test

test.decrease(3);
console.log(test.toString()); // Te...

test.decrease(5);
console.log(test.toString()); // ...

test.increase(4);
console.log(test.toString()); // Test
