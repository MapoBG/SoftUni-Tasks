export const checkUserPasswords = ({ password, rePassword }) => {

    if (password.length < 6) {
        return 'Password should be at least 6 characters long';
    }

    if (password !== rePassword || rePassword.length < 6) {
        return 'Passwords don\'t match';
    }

    return '';
};

export const checkUserEmail = ({ email }) => {

    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return '';
    } else {
        return 'Please insert a valid email.\n Examples: mysite@ourearth.com, my.ownsite@ourearth.org, mysite@you.me.net';
    }
};

export const finalValidation = (userData) => {
    const errors = {
        email: checkUserEmail(userData),
        password: checkUserPasswords(userData),
    };

    return errors;
}