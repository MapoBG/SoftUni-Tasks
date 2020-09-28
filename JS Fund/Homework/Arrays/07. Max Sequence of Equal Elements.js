function maxSequence(arr) {
    let max = [];

    for (let i = 0; i < arr.length; i++) {
        let tempMax = [];
        let currentNum = arr[i];
        tempMax.push(currentNum);
        for (let j = i + 1; j < arr.length; j++) {
            let nextNum = arr[j];
            if (currentNum === nextNum) {
                tempMax.push(nextNum);
            } else {
                if (tempMax.length > max.length) {
                    max = tempMax;
                }
                break;
            }
        }
    }
    console.log(max.join(" "));
}
maxSequence([2, 1, 1, 2, 3, 3, 2, 2, 2, 1]);