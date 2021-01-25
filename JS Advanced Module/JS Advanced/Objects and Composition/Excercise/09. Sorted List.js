function createSortedList() {

    const result = {
        arr: [],
        add(element) {
            this.arr.push(element);
            this.arr.sort((a, b) => a - b);
        },
        remove(index) {
            if (index < 0 || index >= this.arr.length) {
                throw new Error("Incorrect index");
            }

            this.arr.splice(index, 1).sort((a, b) => a - b);
        },
        get(index) {
            if (index < 0 || index >= this.arr.length) {
                throw new Error("Incorrect index");
            }

            return this.arr[index];
        },
        get size() {
            return this.arr.length;
        }
    };

    return result;
}

var myList = createSortedList();

// Generate random list of 20 numbers
var expectedArray = [];
for (let i = 0; i < 20; i++) {
    expectedArray.push(Math.floor(Math.random() * 200) - 100);
}
// Add to collection
for (let i = 0; i < expectedArray.length; i++) {
    myList.add(expectedArray[i]);
}
console.log(myList.size);
// expect(myList.size).to.equal(20, "Elements weren't added");
// Sort array
expectedArray.sort((a, b) => a - b);
// Compare with collection
for (let i = 0; i < expectedArray.length; i++) {
    // expect(myList.get(i)).to.equal(expectedArray[i], "Array wasn't sorted");
}
myList.get(5)
console.log(myList.hasOwnProperty("size"));