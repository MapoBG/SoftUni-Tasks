const jwt = require("jsonwebtoken");
const { secret, sessionName } = require("../config/constants");

exports.auth = (req, res, next) => {
    let token = req.cookies[sessionName];

    if (token) {
        try {
            const decodedToken = jwt.verify(token, secret);

            req.user = decodedToken;
            res.locals.user = decodedToken; //attach user to app context = can be accessed in hbs with {{user}}
        } catch (error) {
            return res.redirect("/404");
        }
    }
    next();
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        res.redirect("/404");
    }

    next();
}