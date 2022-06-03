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

exports.getAll = async (search = "", fromInput, toInput) => {
    const from = Number(fromInput) || 0;
    const to = Number(toInput) || 6;

    const result = cubesDb
        .filter(cube => {
            return cube.difficultyLevel >= from && cube.difficultyLevel <= to && (cube.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || cube.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        });

    return result;
};