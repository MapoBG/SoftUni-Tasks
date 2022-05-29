let breedsDB = require("../data/breedsDb.json");

module.exports = async (url, fs) => {
    let addBreedPage = await fs.readFile("./views/addBreed.html", "utf-8");
    let [newBreed] = url.searchParams.values();
    if (newBreed) {
        let modifiedDB = breedsDB.map(e => e.toLocaleLowerCase());
        modifiedDB.find(c => c === newBreed.toLocaleLowerCase()) ? true : breedsDB.push(newBreed);
        await fs.writeFile("./data/breedsDb.json", JSON.stringify(breedsDB), "utf-8");
    }
    return addBreedPage;
}