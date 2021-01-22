function solve(input) {
    const result = {};

    input.forEach((element, index) => {
        if (index % 2 == 0) {
            result[element] = Number(input[index + 1]);
        }
    });

    return result;
}

solve(['Yoghurt', '48', 'Rise', '138', 'Apple', '52']);