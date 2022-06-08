const Accessory = require("../models/Accessory");
const Cube = require("../models/Cube");

const constructors = {
    Cube,
    Accessory
};

exports.saveData = (itemType, itemInfo) => constructors[itemType].create(itemInfo);

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.getAll = (itemType, search = "", fromInput, toInput) => {
    const from = Number(fromInput) || 0;
    const to = Number(toInput) || 6;

    const result = constructors[itemType].find();

    // const result = cubesDb
    //     .filter(cube => {
    //         return cube.difficultyLevel >= from && cube.difficultyLevel <= to && (cube.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || cube.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    //     });

    return result;
};