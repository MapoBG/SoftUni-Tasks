function raceInfo(input) {
    let participants = input.shift().split(", ");
    let line = input.shift();
    let raceList = {};

    while (line != "end of race") {
        let name = line.match(/[A-Za-z]+/g).join("")
        let distance = line.match(/[\d]/g).map(Number).reduce((a, b) => a + b);
        if(participants.includes(name)){
            if(!raceList[name]){
                raceList[name] = distance;
            } else {
                raceList[name] += distance;
            }
        }
        line = input.shift();
    }
    let sortedParticipants = Object.keys(raceList).sort((p1, p2) => raceList[p2] - raceList[p1]).slice(0, 3);
    console.log(`1st place: ${sortedParticipants[0]}\n2nd place: ${sortedParticipants[1]}\n3rd place: ${sortedParticipants[2]}`);
}
raceInfo([
    'George, Peter, Bill, Tom',
    'G4e@55or%6g6!68e!!@',
    'R1@!3a$y4456@',
    'B5@i@#123ll',
    'G@e54o$r6ge#',
    '7P%et^#e5346r',
    'T$o553m&6',
    'end of race'
])