function Spy(obj, methodAsString) {
    let originalMethod = obj[methodAsString];
    let result = { count: 0 };

    obj[methodAsString] = function () {
        result.count++;

        return originalMethod.call(obj, ...arguments)
    }

    return result;
}

let obj = {
    method: () => "invoked"
}
let spy = Spy(obj, "method");

obj.method();
obj.method();
obj.method();

console.log(spy) // { count: 3 }
