exports.registrationValidator = (userData) => {
    const result = {
        isValid: true,
        msgs: []
    };

    if (userData.username.length < 4) {
        result.isValid = false;
        result.msgs.push('Username should be at least 4 characters long!');
    }

    if (userData.password.length !== 3) {
        result.isValid = false;
        result.msgs.push('Password should be at least 3 char long!');
    }

    if (userData.password !== userData.repassword) {
        result.isValid = false;
        result.msgs.push('Passwords doesn\'t match!');
    }

    if (userData.address.length > 20) {
        result.isValid = false;
        result.msgs.push('Address should be a maximum of 20 characters long!');
    }

    return result;
};