function checkSpeed(speed, area) {
    let speedLimit = 0;

    switch (area) {
        case "motorway":
            speedLimit = 130;
            break;
        case "interstate":
            speedLimit = 90;
            break;
        case "city":
            speedLimit = 50;
            break;
        case "residential":
            speedLimit = 20;
            break;
    }

    if (speed <= speedLimit) {
        console.log(`Driving ${speed} km/h in a ${speedLimit} zone`);
        return;
    }

    let overSpeedLimit = speed - speedLimit;
    let status = "";

    switch (true) {
        case (overSpeedLimit <= 20):
            status = "speeding";
            break;

        case overSpeedLimit <= 40:
            status = "excessive speeding";
            break;

        default:
            status = "reckless driving";
            break;
    }
    console.log(`The speed is ${overSpeedLimit} km/h faster than the allowed speed of ${speedLimit} - ${status}`);
}
checkSpeed(200, 'motorway')