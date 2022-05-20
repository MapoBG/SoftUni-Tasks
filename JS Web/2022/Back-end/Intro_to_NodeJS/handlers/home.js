const { URL } = require("url");
const fs = require("fs");
const path = require("path");

const catsDB = require("../data/catsDb.json");
const breedsDB = require("../data/breedsDb.json");
let { homePage } = require("../views/homePage");
const css = require("../styles/siteCss");
let addCatPage = require("../views/addCat");
const addBreedPage = require("../views/addBreed");

const catTemplate = require("../views/catTemplate");
const breedTemplate = require("../views/breedsOptionTemplate")

const myUrl = 'http://localhost:5555';

module.exports = (req, res) => {
    const pathname = new URL(req.url, myUrl).pathname;

    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    if (pathname == "/") {
        homePage = homePage.replace("{{cats}}", catsDB
            .filter((c) => c.deleted == false)
            .map(c => catTemplate(c)).join(""));
        res.write(homePage);
        res.end();
    } else if (pathname == "/content/styles/site.css") {
        res.writeHead(200, {
            "Content-Type": "text/css"
        });
        res.write(css);
        res.end();
    } else if (pathname == "/cats/add-breed") {
        res.write(addBreedPage);
        res.end();
    } else if (pathname == "/cats/add-cat") {
        addCatPage = addCatPage.replace("{{breeds}}", breedsDB
            .sort((b1, b2) => b1.breed.localeCompare(b2.breed))
            .map(b => breedTemplate(b)).join(""));
        res.write(addCatPage);
        res.end();
    } else {
        return true;
    }
}