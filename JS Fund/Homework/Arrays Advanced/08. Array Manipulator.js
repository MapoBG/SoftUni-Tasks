function manipulateArr(numArr, commands) {
    let result = numArr.slice();

    for (let line of commands) {
        let [command, ...rest] = line.split(" ");
        [...rest] = [...rest].map(Number);
        switch (command) {
            case 'add': {
                let [index, element] = [...rest];
                result.splice(index, 0, element);
            }
                break;
            case 'addMany': {
                let [index, ...nums] = [...rest];
                nums.reverse().forEach(n => {
                    result.splice(index, 0, n);
                })
            }
                break;
            case 'contains':
                let element = rest[0]
                console.log(result.indexOf(element));
                break;
            case 'remove':
                let index = rest;
                result.splice(index, 1);
                break;
            case 'shift':
                let positions = rest;
                for (let i = 0; i < positions; i++) {
                    let num = result.shift();
                    result.push(num);
                }
                break;
            case 'sumPairs':
                let summedArr = []
                for (let n = 0; n < result.length; n += 2) {
                    let n1 = result[n];
                    let n2 = result[n + 1];
                    if (isNaN(n2)) {
                        n2 = 0;
                    }
                    summedArr.push(n1 + n2);
                }
                result = summedArr;
                break;
            case 'print':
                return console.log(`[ ${result.join(", ")} ]`);
        }
    }

    console.log(result);
}
manipulateArr([1, 2, 4, 5, 6, 7],
    ['add 1 8', 'contains 1', 'contains 3', 'print']  

)