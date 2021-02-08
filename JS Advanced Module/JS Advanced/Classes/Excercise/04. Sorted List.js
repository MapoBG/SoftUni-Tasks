class List {
    constructor() {
        this.list = [];
        this.size = 0;
    }

    add(num) {
        this.list.push(num);
        this._size();
        return this;
    }

    remove(index) {
        if (index >= 0 && index < this.list.length) {
            this.list.splice(index, 1);
            this._size();
            return this;
        }
    }

    get(index) {
        if (index >= 0 && index < this.list.length) {
            return this.list[index];
        }
    }

    _size() {
        this.size = this.list.length;
        this.list = this.list.sort((a, b) => a - b);
    }
}

let list = new List();
// list.add(5);
// list.add(6);
// list.add(7);
console.log(list.get(0));

console.log(list.remove(0));
console.log(list.size);