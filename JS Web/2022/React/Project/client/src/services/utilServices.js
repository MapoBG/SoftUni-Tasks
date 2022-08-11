export const cardDuration = 5;

export const cycleArray = (games) => {
    const newArray = [...games];
    newArray.push(newArray.shift());

    return newArray;
};