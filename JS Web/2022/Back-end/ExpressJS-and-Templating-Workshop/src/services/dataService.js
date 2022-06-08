const { default: mongoose } = require("mongoose");
const Accessory = require("../models/Accessory");
const Cube = require("../models/Cube");

const constructors = {
    Cube,
    Accessory
};

exports.saveData = (itemType, itemInfo) => constructors[itemType].create(itemInfo);

exports.getAll = (itemType, search = "", fromInput, toInput) => {
    const from = Number(fromInput) || 0;
    const to = Number(toInput) || 6;

    const regEx = new RegExp(search, "i");

    const result = constructors[itemType].find({ $or: [{ name: regEx }, { description: regEx }] })
        .where("difficultyLevel").lte(to).gte(from)

    // const result = allCubes
    //     .filter(cube => {
    //         return cube.difficultyLevel >= from && cube.difficultyLevel <= to && (cube.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || cube.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    //     });

    return result;
};

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.getOneDetailed = (cubeId) => Cube.findById(cubeId).populate("accessories");

exports.attachAcc = async (cubeId, accId) => {
    const cubeObjId = mongoose.Types.ObjectId(cubeId);
    const accObjId = mongoose.Types.ObjectId(accId);

    await Cube.updateMany({ _id: cubeId }, { $push: { accessories: accObjId } });
    await Accessory.updateMany({ _id: accId }, { $push: { cubes: cubeObjId } });
};

exports.getFiltered = (accIds) => Accessory.find({ _id: { $nin: accIds } });