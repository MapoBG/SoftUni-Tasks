function solve() {
    let stringResult = "";

    return {
        append: (string) => stringResult += string,
        removeStart: (num) => stringResult = stringResult.slice(num),
        removeEnd: (num)=> stringResult = stringResult.slice(0, stringResult.length - num),
        print: () => console.log(stringResult),
    }
}

let secondZeroTest = solve();

secondZeroTest.append('123');
secondZeroTest.append('45');
secondZeroTest.removeStart(2);
secondZeroTest.removeEnd(1);
secondZeroTest.print();

