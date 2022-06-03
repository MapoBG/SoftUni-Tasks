const fs = require("fs/promises");
const path = require("path");

const cubesDb = require("../cubesDB.json");

exports.saveData = async (cubeInfo) => {
    cubeInfo.id = cubesDb[cubesDb.length - 1].id + 1;
    cubesDb.push(cubeInfo);

    fs.writeFile(path.resolve("src", "cubesDB.json"), JSON.stringify(cubesDb, "", 4))
};

exports.getOne = (cubeId) => {
    return cubesDb.find(cube => cube.id == cubeId);
};

exports.getAll = async () => cubesDb;

exports.search = async (searchParams) => {
    if (!searchParams.search) {
        searchParams.search == false;
    }

    if (!searchParams.from) {
        searchParams.from = 0;
    }

    if (!searchParams.to) {
        searchParams.to = Number.MAX_SAFE_INTEGER;
    }
    return searchParams;
};