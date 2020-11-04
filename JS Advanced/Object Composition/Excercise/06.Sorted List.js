function solve() {
    let numberList = [];

    return {
        add: function (num) {
            numberList.push(num);
            this.size++;
            return numberList.sort((a, b) => a - b);
        },
        remove: function (index) {
            if (numberList.length > 0 && index >= 0 && index <= numberList.length - 1) {
                this.size--;
                return numberList.splice(index, 1)
            }
        },
        get: function (index) {
            if (numberList.length > 0 && index >= 0 && index <= numberList.length - 1) {
                return numberList[index];
            }
        },
        size: 0,
    }
}

var myList = solve();
var failsafe = 'failsafe';

try {
    failsafe = myList.get(0) ? myList.get(0) : 'failsafe';
} catch (e) { }

// expect(myList.size).to.equal(0, "Unexpected behaviour with empty collection.");
// expect(failsafe).to.equal('failsafe', "Unexpected behaviour with empty collection.");

try {
    myList.remove(0);
} catch (e) { }

// expect(myList.size).to.equal(0, "Unexpected behaviour with empty collection.");

// let caller = solve();
// caller.add(5);
// caller.add(1);
// caller.add(3);
// caller.add(4);
// caller.add(2);
// caller.remove(3);
// caller.get(3);
// caller.size();