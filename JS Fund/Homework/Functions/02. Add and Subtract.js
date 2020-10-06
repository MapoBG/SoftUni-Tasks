function addAndSubtr(num1, num2, num3){

    let result = sum(num1, num2);
    let final = subtract(result, num3);
    console.log(final);

    function sum(num1, num2){
        return num1 + num2;
    }

    function subtract(result, num3){
        return result - num3;
    }
}
addAndSubtr(23,
    6,
    10
    )   