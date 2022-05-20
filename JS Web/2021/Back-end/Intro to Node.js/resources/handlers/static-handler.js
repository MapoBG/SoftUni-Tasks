const url = require("url");
const fs = require("fs");
const { errorHandler, dataHandler } = require("./services");

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname.startsWith("/content") && req.method == "GET") {
        fs.readFile(`./${pathname}`, (err, data) => {                   // removed  "utf-8", from readFile
            if (err) {
                return errorHandler(err, res);
            }

            dataHandler(data, res, pathname);
        })
    } else {
        return true;
    }
}