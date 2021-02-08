class Rectangle {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this._color = color;
    }

    calcArea() {
        return this.width * this.height;
    }

    set _color(value) {
        return this.color = value[0].toUpperCase() + value.slice(1);
    }
}

let rect = new Rectangle(4, 5, 'red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());