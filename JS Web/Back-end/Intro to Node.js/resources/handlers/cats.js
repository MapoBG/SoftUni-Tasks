const fs = require("fs");
const url = require("url");
const path = require("path");
const qs = require("querystring");
const formidable = require("formidable");
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

            let catBreedPlaceholder = breeds.map(breed => `<option value="${breed}">${breed}</option>`);
            let modifiedData = data.toString().replace(`{{catBreeds}}`, catBreedPlaceholder);

            dataHandler(modifiedData, res, pathname);
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
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                throw err;
            }

            let oldPath = files.upload.path;
            let newPath = path.normalize(path.join("C:/Users/mapob/OneDrive/Desktop/Programming/SoftUni-Tasks/JS Web/Back-end/Intro to Node.js/resources", "/content/images/" + files.upload.name));

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    throw err;
                }

                console.log("File was uploaded successfully");
            })

            fs.readFile("./data/cats.json", "utf8", (err, data) => {
                if (err) {
                    throw err;
                }

                let allCats = JSON.parse(data);
                allCats.push({ id: cats.length + 1, ...fields, image: files.upload.name });
                let json = JSON.stringify(allCats);
                fs.writeFile("./data/cats.json", json, () => {
                    res.writeHead(302, { location: "/" });
                    res.end();
                });
            })

        });

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

                fs.writeFile("./data/breeds.json", json, "utf-8", () => console.log(`The breeds were updated: ${breeds.sort()}!`));
            });

            res.writeHead(302, {
                location: "/"
            });
            res.end();
        });
    } else if (pathname == "/editCat" && req.method == "GET") {

    } else if (pathname == "/editCat" && req.method == "POST") {

    } else if (pathname == "/catShelter" && req.method == "GET") {

    } else if (pathname == "/catShelter" && req.method == "POST") {
        
    }
}