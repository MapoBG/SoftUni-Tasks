function rectangle(width, height, color) {
    color = color[0].toUpperCase() + color.slice(1);

    let result = {
        width,
        height,
        color,
        calcArea() {
            return this.width * this.height;
        }
    };

    return result;
}

let rect = rectangle(5, 5, 'red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());
