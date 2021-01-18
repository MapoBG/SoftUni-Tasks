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

            let modifiedCats = cats.map((cat) => `<li>
            <img src="${path.join("./content/images/" + cat.image)}" alt="${cat.name}">
            <h3>${cat.name}</h3>
            <p><span>Breed: </span>${cat.breed}</p>
            <p><span>Description: </span>${cat.description}</p>
            <ul class="buttons">
            <li class="btn edit"><a href="/editCat/${cat.id}">Change Info</a></li>
            <li class="btn delete"><a href="/catShelter/${cat.id}">New Home</a></li>
            </ul>
        </li>`);

            let modifiedData = data.toString().replace("{{cats}}", modifiedCats);

            dataHandler(modifiedData, res, pathname);
        });
    } else {
        return true;
    }
}