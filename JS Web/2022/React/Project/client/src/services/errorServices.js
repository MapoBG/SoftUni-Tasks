export const checkUserPassword = ({ password }) => {

    if (!password || password.length < 6) {
        return 'Password is required field and should be at least 6 characters long';
    }
    return '';
};

export const checkUserRePassword = ({ password, rePassword }) => {
    if (rePassword === undefined) {
        return '';
    }

    if (!rePassword || rePassword.length < 6) {
        return 'Repeat passwords is required and should be at least 6 characters long'
    }

    if (password !== rePassword) {
        return 'Passwords don\'t match';
    }
    return '';
}

export const checkUserEmail = ({ email }) => {

    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return 'Please insert a valid email.\n Examples: mysite@ourearth.com, my.ownsite@ourearth.org, mysite@you.me.net';
    }
    return '';
};