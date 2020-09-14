function printDestinationInfo(input){
    let correctPattern = /([=\/])([A-Z]+[A-Za-z]{2,})\1/g;
    let destination = correctPattern.exec(input);
    let travelPoints = 0;
    let result = [];

    while(destination){
        travelPoints += destination[2].length;
        result.push(destination[2]);
        destination = correctPattern.exec(input);
    }
    console.log(`Destinations: ${result.join(", ")}\nTravel Points: ${travelPoints}`);
}
printDestinationInfo("ThisIs some InvalidInput");