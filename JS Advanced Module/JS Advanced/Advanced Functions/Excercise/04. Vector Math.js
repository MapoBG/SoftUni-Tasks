solution = {
    add: (vec1, vec2) => [(vec1[0] + vec2[0]), vec1[1] + vec2[1]],
    multiply: (vec1, scalar) => vec1.map(v => v * scalar),
    length: (vec1) => Math.sqrt(vec1[0] ** 2 + vec1[1] ** 2),
    dot: (vec1, vec2) => {
        let [x1, x2] = vec1;
        let [y1, y2] = vec2;
        return (x1 * y1 + x2 * y2);
    },
    cross: (vec1, vec2) => {
        let [x1, x2] = vec1;
        let [y1, y2] = vec2;
        return (x1 * y2 - y1 * x2);
    },
}
solution.add([1, 1], [1, 0]);