const { URL } = require("url");
const fs = require("fs/promises");
const path = require("path");

const homeHandler = require("./home");
const addBreedHandler = require("./addBreed");
const { addCatPageHandler, addCat } = require("./addCat");

const myUrl = 'http://localhost:5555';

module.exports = async (req, res) => {
    const url = new URL(req.url, myUrl);

    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    if (url.pathname == "/content/styles/site.css") {
        res.writeHead(200, {
            "Content-Type": "text/css"
        });
        let styleCss = await fs.readFile("./content/styles/site.css", "utf-8");
        res.write(styleCss);
    } else if (url.pathname == "/" || url.pathname == "/search") {
        let homePage = await homeHandler(url, fs);
        res.write(homePage);
    } else if (url.pathname == "/cats/add-breed") {
        let addBreedPage = await addBreedHandler(url, fs);
        res.write(addBreedPage);
    } else if (url.pathname.startsWith("/cats/add-cat") && req.method === "POST") {
        let addCatPage = await addCat(req, fs);
        console.log("here!");
        res.writeHead(301, {
            Location: myUrl,
            "Content-Type": "text/html"
        });
        // res.write(addCatPage);
    } else if (url.pathname == "/cats/add-cat") {
        let addCatPage = await addCatPageHandler(fs);
        res.write(addCatPage);
    } else {
        await res.write("404\n Page not found!");
    }
    res.end();
}