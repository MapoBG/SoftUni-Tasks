function rotateArr(arr, rotates) {

    while (rotates) {
        let lastElement = arr.pop();
        arr.unshift(lastElement);
        rotates--;
    }

    console.log(arr.join(" "));
}
rotateArr(['Banana', 
'Orange', 
'Coconut', 
'Apple'], 
15
)