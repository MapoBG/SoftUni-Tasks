const { default: mongoose } = require("mongoose");
const Accessory = require("../models/Accessory");
const Cube = require("../models/Cube");

const constructors = {
    Cube,
    Accessory
};

exports.saveData = (itemType, itemInfo) => constructors[itemType].create(itemInfo);

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.getOneDetailed = (cubeId) => Cube.findById(cubeId).populate("accessories");

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

exports.attachAcc = async (cubeId, accId) => {
    const cubeObjId = mongoose.Types.ObjectId(cubeId);
    const accObjId = mongoose.Types.ObjectId(accId);

    await Cube.updateMany({ _id: cubeId }, { $push: { accessories: accObjId } });
    await Accessory.updateMany({ _id: accId }, { $push: { cubes: cubeObjId } });
};