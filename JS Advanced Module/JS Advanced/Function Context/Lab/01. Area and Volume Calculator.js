function area() {
    return this.x * this.y;
};

function vol() {
    return this.x * this.y * this.z;
};

function solve(area, vol, input) {
    let inputArr = JSON.parse(input);
    let result = [];

    inputArr.map(figure => {
        let figureArea = area.call(figure);
        let figureVolume = vol.call(figure);
        result.push({ 'area': Math.abs(figureArea), 'volume': Math.abs(figureVolume) });
    });
    return result;
}
solve(area, vol, '[{"x":"10","y":"-22","z":"10"},{"x":"47","y":"7","z":"-5"},{"x":"55","y":"8","z":"0"},{"x":"100","y":"100","z":"100"},{"x":"55","y":"80","z":"250"}]')