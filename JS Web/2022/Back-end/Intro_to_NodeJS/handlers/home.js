const { URL } = require("url");
const fs = require("fs/promises");
const path = require("path");

let catsDB = require("../data/catsDb.json");
let breedsDB = require("../data/breedsDb.json");

const catTemplate = require("../views/catTemplate");
const breedTemplate = require("../views/breedsOptionTemplate")

const myUrl = 'http://localhost:5555';

module.exports = async (req, res) => {
    const url = new URL(req.url, myUrl);

    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    if (url.pathname == "/" || url.pathname == "/search") {
        let homePageHtml = await fs.readFile("./views/homePage.html", "utf-8");
        let [search] = url.searchParams.values();

        let homePage = homePageHtml.replace("{{cats}}", catsDB
            .filter((c) => search
                ? c.deleted == false && c.name.toLowerCase().includes(search.toLowerCase())
                : c.deleted == false)
            .map(c => catTemplate(c)).join(""));
        res.write(homePage);
    } else if (url.pathname == "/content/styles/site.css") {
        res.writeHead(200, {
            "Content-Type": "text/css"
        });
        let styleCss = await fs.readFile("./content/styles/site.css", "utf-8");
        res.write(styleCss);
    } else if (url.pathname == "/cats/add-breed") {
        let addBreedPage = await fs.readFile("./views/addBreed.html", "utf-8");
        let [newBreed] = url.searchParams.values();
        if (newBreed) {
            let modifiedDB = breedsDB.map(e => e.toLocaleLowerCase());
            modifiedDB.find(c => c === newBreed.toLocaleLowerCase()) ? true : breedsDB.push(newBreed);
            await fs.writeFile("./data/breedsDb.json", JSON.stringify(breedsDB), "utf-8");
        }
        res.write(addBreedPage);
    } else if (url.pathname == "/cats/add-cat") {
        let addCatPageHtml = await fs.readFile("./views/addCat.html", "utf-8");
        addCatPage = addCatPageHtml.replace("{{breeds}}", breedsDB
            .sort((b1, b2) => b1.localeCompare(b2))
            .map(b => breedTemplate(b)).join(""));
        res.write(addCatPage);
    } else {
        await res.write("404\n Page not found!");
    }
    res.end();
}