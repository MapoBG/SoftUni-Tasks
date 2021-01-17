const fs = require("fs");
const url = require("url");
const path = require("path");
const cats = require("../data/cats.json");
const { getPath, errorHandler, dataHandler } = require("./services");

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if ((pathname == "/" || pathname == "/home") && req.method == "GET") {
        let filePath = getPath("../views/home/index.html");

        fs.readFile(filePath, (err, data) => {
            if (err) {
                return errorHandler(err, res);
            }

            dataHandler(data, res, pathname);
        });
    } else {
        return true;
    }
}