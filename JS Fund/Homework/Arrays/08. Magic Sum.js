function findPairs(array, num){

    for (let i = 0; i < array.length; i++) {
        let element = array[i];
        for (let j = i + 1; j < array.length; j++) {
            let element2 = array[j];

            if((element + element2) === num){
                console.log(`${element} ${element2}`);
            }
        }        
    }
}
findPairs([1, 7, 6, 2, 19, 23],
    8
    )