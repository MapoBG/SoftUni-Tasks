function closure(input) {
    let result = [];
    function builder() {
        return {
            add: (string) => result.push(string),
            remove: (string) => result = result.filter(e => e != string),
            print: () => console.log(result.join(',')),
        }
    }
    let start = builder();
    input.forEach(line => {
        let [command, arg] = line.split(" ");
        start[command](arg);
    });
    return result;
}
closure(['add hello', 'add again', 'remove hello', 'add again', 'print'])