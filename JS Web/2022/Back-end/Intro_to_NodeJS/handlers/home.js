const { URL } = require("url");
const fs = require("fs/promises");
const path = require("path");

const catTemplate = require("../views/catTemplate");
const breedTemplate = require("../views/breedsOptionTemplate")

const myUrl = 'http://localhost:5555';

module.exports = async (req, res) => {
    const pathname = new URL(req.url, myUrl).pathname;

    let catsDB = await fs.readFile("./data/catsDb.json", "utf-8");
    let catsData = JSON.parse(catsDB);
    let breedsDB = await fs.readFile("./data/breedsDb.json", "utf-8");
    let breedsData = JSON.parse(breedsDB);

    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    if (pathname == "/") {
        let homePageHtml = await fs.readFile("./views/homePage.html", "utf-8");
        let homePage = homePageHtml.replace("{{cats}}", catsData
            .filter((c) => c.deleted == false)
            .map(c => catTemplate(c)).join(""));
        res.write(homePage);
    } else if (pathname == "/content/styles/site.css") {
        res.writeHead(200, {
            "Content-Type": "text/css"
        });
        let styleCss = await fs.readFile("./content/styles/site.css", "utf-8");
        res.write(styleCss);
    } else if (pathname == "/cats/add-breed") {
        let addBreedPage = await fs.readFile("./views/addBreed.html", "utf-8");
        res.write(addBreedPage);
    } else if (pathname == "/cats/add-cat") {
        let addCatPageHtml = await fs.readFile("./views/addCat.html", "utf-8");
        addCatPage = addCatPageHtml.replace("{{breeds}}", breedsData
            .sort((b1, b2) => b1.breed.localeCompare(b2.breed))
            .map(b => breedTemplate(b)).join(""));
        res.write(addCatPage);
    } else {
        return true;
    }
    res.end();
}