function findMaxNr(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        let isBigger = true;
        let number = arr[i];
        for (let j = i + 1; j < arr.length; j++) {
            let nextNr = arr[j];
            if (number <= nextNr) {
                isBigger = false;
                break;
            } else {
                continue;
            }
        }
        if(isBigger){
            result.push(number);
        }
    }
    console.log(result.join(" "));
}
findMaxNr([27, 19, 42, 2, 13, 45, 48]);