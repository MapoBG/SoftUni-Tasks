function solve(input) {
    let result = input.map(([width, height]) => ({
        width,
        height,
        area() {
            return this.width * this.height;
        },
        compareTo(rectangle) {
            return rectangle.area() - this.area() || rectangle.width - this.width;
        }
    }))
        .sort((a, b) => a.compareTo(b));
    return result
}
solve([[10, 5], [3, 20], [5, 12]])


