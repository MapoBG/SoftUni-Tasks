const fs = require("fs");
const url = require("url");
const path = require("path");
const qs = require("querystring");
// const formidable = require("formidable");
const cats = require("../data/cats.json");
const breeds = require("../data/breeds.json");
const { getPath, errorHandler, dataHandler } = require("./services");

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname == "/addCat" && req.method == "GET") {
        let filePath = getPath("../views/addCat.html");

        fs.readFile(filePath, (err, data) => {
            if (err) {
                return errorHandler(err, res);
            }

            dataHandler(data, res, pathname);
        });

    } else if (pathname == "/addBreed" && req.method == "GET") {
        let filePath = getPath("../views/addBreed.html");

        fs.readFile(filePath, (err, data) => {
            if (err) {
                return errorHandler(err, res);
            }

            dataHandler(data, res, pathname);
        });
    } else if (pathname == "/addCat" && req.method == "POST") {
        ////////////////////////

    } else if (pathname == "/addBreed" && req.method == "POST") {
        let formData = "";

        req.on("data", (data) => {
            formData += data;
        });

        req.on("end", () => {
            let body = qs.parse(formData);

            fs.readFile("./data/breeds.json", (err, data) => {
                if (err) {
                    throw err;
                }

                let breeds = JSON.parse(data);
                if (!breeds.includes(body.breed)) {
                    breeds.push(body.breed);
                }

                let json = JSON.stringify(breeds);

                fs.writeFile("./data/breeds.json", json, "utf-8", () => console.log(`The breed was updated ${breeds}!`));

                res.writeHead(102, {
                    location: "/"
                });
                res.end();
            });
        })
    }
}