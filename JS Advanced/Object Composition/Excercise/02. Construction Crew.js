function solve(workerObj) {

    if (workerObj.dizziness == true) {
        workerObj.levelOfHydrated += (workerObj.weight * 0.1) * workerObj.experience;
        workerObj.dizziness = false;
    }
    return workerObj;
}
solve({
    weight: 80,
    experience: 1,
    levelOfHydrated: 0,
    dizziness: true
}
)