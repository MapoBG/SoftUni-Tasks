const http = require("http");
const port = 5555;

// const catsDB = require("./data/catsDb.json");
// const breedsDB = require("./data/breedsDb.json");
// let { homePage } = require("./views/homePage");
// const css = require("./styles/siteCss");
// let addCatPage = require("./views/addCat");
// const addBreedPage = require("./views/addBreed");

// const catTemplate = require("./views/catTemplate");
// const breedTemplate = require("./views/breedsOptionTemplate")

const server = require("./handlers/home");
const handlers = require("./handlers/interface");

http.createServer((req, res) => {
    server(req, res);
}
).listen(port, () => console.log(`Server is listening on port ${port}`));