function determineAge(age) {
    let result = "";

    if ((age < 3 && age >= 0)) {
        result = "baby";
    } else if ((age < 14 && age >= 0)) {
        result = "child";
    } else if (age < 20 && age >= 0) {
        result = "teenager";
    } else if ((age < 66 && age >= 0)) {
        result = "adult";
    } else if ((age >= 66 && age >= 0)) {
        result = "elder";
    } else {
        result = "out of bounds";
    }
    console.log(result);
}
determineAge(-3)