function validatePass(string) {
    let isValid = true;
    let regExValidator = /^[A-Za-z0-9]*$/;
    let regExNrValidator = /[0-9]{2,}/

    if(string.length < 6 || string.length > 10){
        isValid = false;
        console.log("Password must be between 6 and 10 characters");
    }

    if(!string.match(regExValidator)){
        isValid = false;
        console.log("Password must consist only of letters and digits");
    }

    if(!string.match(regExNrValidator)){
        isValid = false;
        console.log("Password must have at least 2 digits");
    }

    if(isValid){
        console.log("Password is valid");
    }
}
validatePass('MyPass123')