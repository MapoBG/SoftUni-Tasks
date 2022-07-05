const jwt = require('jsonwebtoken');

const { secret, sessionName } = require('../config/env');

exports.auth = (req, res, next) => {
    const token = req.cookies[sessionName];

    if (token) {
        try {
            const decodedToken = jwt.verify(token, secret); //can be async if secret is fetched remotely, otherwise operation is sync no matter if cb is used.

            req.user = decodedToken;
            res.locals.user = decodedToken;
        } catch (error) {
            res.clearCookie(sessionName);

            return res.redirect('/user/login');
        }
    }

    next();
};

exports.isAuth = (req, res, next) => {              //route guard
    if (!req.user) {
        return res.redirect('user/404');
    }

    next();
};

exports.isGuest = (req, res, next) => {              //route guard
    if (req.user) {
        return res.redirect('user/404');
    }

    next();
};