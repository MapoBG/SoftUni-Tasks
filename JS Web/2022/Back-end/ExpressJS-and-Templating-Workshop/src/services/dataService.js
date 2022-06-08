const Accessory = require("../models/Accessory");
const Cube = require("../models/Cube");

const constructors = {
    Cube,
    Accessory
};

exports.saveData = (itemInfo, itemType) => constructors[itemType].create(itemInfo);

exports.getOne = (cubeId) => Cube.findById(cubeId);

// exports.getOneDetailed = (cubeId) => Cube.findById(cubeId);

exports.getAll = (search = "", fromInput, toInput) => {
    const from = Number(fromInput) || 0;
    const to = Number(toInput) || 6;

    const result = Cube.find();

    // const result = cubesDb
    //     .filter(cube => {
    //         return cube.difficultyLevel >= from && cube.difficultyLevel <= to && (cube.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || cube.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    //     });

    return result;
};