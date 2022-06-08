exports.saveData = async (newItem) => newItem.save();

exports.getOne = async (cubeId) => await Cube.findById(cubeId).lean();

exports.getOneDetailed = async (cubeId) => await Cube.findById(cubeId);

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