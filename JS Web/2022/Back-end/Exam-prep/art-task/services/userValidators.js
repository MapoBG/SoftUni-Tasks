const { getUser } = require('./userServices');
const { comparePasswords } = require('./utils');

const result = {
    isValid: true,
    msgs: []
};

exports.registrationValidator = (userData) => {
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

    if (userData.address.length > 20 || !userData.address) {
        result.isValid = false;
        result.msgs.push('Address is required and should be maximum 20 characters long!');
    }

    return result;
};

exports.loginValidator = async (userData) => {
    try {
        const user = await getUser(userData.username);
        const isValid = await comparePasswords(userData.password, user.password);

        if (!isValid) {
            result.isValid = false;
            result.msgs = ['Incorrect name or password!'];
        }

        return { result, user };
    } catch (error) {
        result.isValid = false;
        result.msgs = ['Incorrect name or password!'];

        return { result };
    }
};

exports.isCorrectUser = (currentUser, user) => {
    if (currentUser != user) {               //check if current user == author of publication
        throw { message: 'Invalid user' };
    }
}

exports.shareCorrectUser = (currentUser, user) => {
    if (currentUser == user) {               //check if current user != author of publication
        throw { message: 'Invalid user' };
    }
}