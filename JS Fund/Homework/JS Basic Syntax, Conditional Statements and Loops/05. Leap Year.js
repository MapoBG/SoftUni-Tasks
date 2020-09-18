function checkIfYearisLeap(year) {
    let result = "no";
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0){
        result = "yes";
    }
    console.log(result);
}
checkIfYearisLeap(4);