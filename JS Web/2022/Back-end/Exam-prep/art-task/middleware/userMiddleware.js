const jwt = require('jsonwebtoken');

const { secret, sessionName } = require('../config/env');

exports.auth = (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies[sessionName];

    if (token) {
        try {
            const decodedToken = jwt.verify(token, secret); //can be async if secret is fetched remotely, otherwise operation is sync no matter if cb is used.

            req.user = decodedToken;
            res.locals.user = decodedToken;
        } catch (error) {
            return res.redirect("user/404");
        }
    }

    next();
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect("user/404");
    }

    next();
}