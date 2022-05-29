const formidable = require("formidable");

let catsDB = require("../data/catsDb.json");
let breedsDB = require("../data/breedsDb.json");
const breedTemplate = require("../views/breedsOptionTemplate")

exports.addCatPageHandler = async (fs) => {
    let addCatPageHtml = await fs.readFile("./views/addCat.html", "utf-8");
    addCatPage = addCatPageHtml.replace("{{breeds}}", breedsDB
        .sort((b1, b2) => b1.localeCompare(b2))
        .map(b => breedTemplate(b)).join(""));
    return addCatPage;
}

exports.addCat = async (req, fs) => {
    // let [name, description, image, breed] = url.searchParams.values();
    const fromData = formidable({});
    fromData.parse(req, (err, fields, files) => {
        console.log(JSON.stringify({ fields, files }));
    });
    // if (name && description && breed) {
    //     let newCat = {
    //         name,
    //         imageUrl: image,
    //         price: 0,
    //         breed,
    //         description,
    //         deleted: false
    //     }

    //     catsDB.push(newCat);
    //     await fs.writeFile("./data/catsDb.json", JSON.stringify(catsDB), "utf-8");
    // }

}