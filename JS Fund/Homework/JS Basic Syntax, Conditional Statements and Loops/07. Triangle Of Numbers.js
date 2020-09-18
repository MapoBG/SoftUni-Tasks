function printTriangle(n){
    for (let i = 1; i <= n; i++) {
        let string = i.toString() + " ";
        console.log(string.repeat(i));        
    }
}
printTriangle(6)