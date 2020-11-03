function composeObj(input) {
    let inputArr = JSON.parse(input);
    let result = inputArr.reduce((acc, x) => ({...acc, ...x}), {});
    
    return result;
}

let composer = composeObj;
let actual = composer(`[{"prop1": 1},{"prop2":2},{"prop3":3}]`);
let expected = {prop1:1,prop2:2,prop3:3};
console.log(expected === actual);