function printTownInfo(info){
    let result = [];

    info.forEach(line => {
        let [town, latitude, longitude] = line.split(" | ");
        latitude = Number(latitude).toFixed(2)
        longitude = Number(longitude).toFixed(2)
        result.push({town, latitude, longitude});
     });
     result.forEach(infoLine => console.log(infoLine))
}
printTownInfo(
    ['Sofia | 42.696552 | 23.32601',
'Beijing | 39.913818 | 116.363625']
)