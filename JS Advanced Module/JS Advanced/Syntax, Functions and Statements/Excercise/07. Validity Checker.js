function solve(x1, y1, x2, y2) {

    return `{${x1}, ${y1}} to {0, 0} is ${getResult(x1, y1, 0, 0)}
{${x2}, ${y2}} to {0, 0} is ${getResult(x2, y2, 0, 0)}
{${x1}, ${y1}} to {${x2}, ${y2}} is ${getResult(x1, y1, x2, y2)}`

    function getResult(x1, y1, x2, y2) {
        let result = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

        return Number.isInteger(result) ? "valid" : "invalid";
    }
}
console.log(solve(3, 0, 0, 4));