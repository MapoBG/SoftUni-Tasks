let catsDB = require("../data/catsDb.json");
const catTemplate = require("../views/catTemplate");

module.exports = async (url, fs) => {

    let homePageHtml = await fs.readFile("./views/homePage.html", "utf-8");
    let [search] = url.searchParams.values();

    let homePage = homePageHtml.replace("{{cats}}", catsDB
        .filter((c) => search
            ? c.deleted == false && c.name.toLowerCase().includes(search.toLowerCase())
            : c.deleted == false)
        .map(c => catTemplate(c)).join(""));
    return homePage;
}