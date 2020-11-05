function theLift(input) {
    let people = Number(input[0]);
    let lift = input[1].split(" ").map(Number);

    for (let index in lift) {

        while (lift[index] < 4) {
            if (people > 0) {
                lift[index]++;
                people--;
            } else {
                console.log(`The lift has empty spots!\n${lift.join(' ')}`);
                return;
            }
        }
    }

    if (people > 0){
        console.log(`There isn't enough space! ${people} people in a queue!\n${lift.join(' ')}`);
    } else {
        console.log(lift.join(' '));
    }
}
theLift([
    "15",
    "0 0 0 0 0"
   ]   
   )