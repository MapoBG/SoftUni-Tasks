exports.errorHandler = (err, req, res, next) => {
    const status = err.status || 404;

    res.status(status).render('user/404', { errors: [err.message] });
};