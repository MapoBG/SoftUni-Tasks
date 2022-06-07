const fs = require("fs/promises");
const path = require("path");

const Cube = require("../models/Cube");

exports.saveData = async (cubeInfo) => {
    const newCube = new Cube(cubeInfo);

    newCube.save();
};

exports.getOne = async (cubeId) => await Cube.findById(cubeId).lean();

exports.getAll = async (search = "", fromInput, toInput) => {
    const from = Number(fromInput) || 0;
    const to = Number(toInput) || 6;

    const result = await Cube.find().lean();

    // const result = cubesDb
    //     .filter(cube => {
    //         return cube.difficultyLevel >= from && cube.difficultyLevel <= to && (cube.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || cube.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    //     });

    return result;
};