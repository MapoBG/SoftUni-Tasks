const { getUser } = require('./userServices');
const { comparePasswords } = require('./utils');

const result = {
    isValid: true,
    msgs: []
};

exports.loginValidator = async (userData) => {
    try {
        const user = await getUser(userData.email);
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
    if (currentUser != user) {               //check if current user == owner of crypto
        throw { message: 'Invalid user' };
    }
};

exports.isCorrectBuyer = (currentUser, user) => {
    if (currentUser == user) {               //check if current user != owner of crypto
        throw { message: 'Invalid user' };
    }
};