function solve(input) {
    let inputArr = input.shift().split(" ").map(Number);
    let nextLine = input.shift();

    while (nextLine != 'end') {
        let [command, ind1, ind2] = nextLine.split(" ");

        switch (command) {
            case 'swap':
                swap(inputArr, ind1, ind2);
                break;
            case 'multiply':
                multiply(inputArr, ind1, ind2);
                break;
            case 'decrease':
                decrease();
                break;
        }
        nextLine = input.shift();
    }

    console.log(inputArr.join(", "));

    function swap(arr, ind1, ind2) {
        let firstEl = arr[ind1];
        let secondEl = arr[ind2];

        arr.splice(ind2, 1, firstEl);
        arr.splice(ind1, 1, secondEl);
        return arr;
    }

    function multiply(arr, ind1, ind2) {
        let result = arr[ind1] * arr[ind2];
        arr[ind1] = result;
        return arr;
    }

    function decrease() {
        inputArr = inputArr.map(num => num - 1);
        return inputArr;
    }
}
solve([
    '1 2 3 4',
    'swap 0 1',
    'swap 1 2',
    'swap 2 3',
    'multiply 1 2',
    'decrease',
    'end'
  ]
  
)