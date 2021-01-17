function calculateTime(stepsCount, footprint, speed) {
    let distance = stepsCount * footprint;
    let restTime = Math.floor(distance / 500);
    let timeInSec = distance / (speed / 3.6);

    let minutes = parseInt(timeInSec / 60);
    let hours = Math.floor(timeInSec / 3600);
    let seconds = Math.round(timeInSec - (minutes * 60));

    minutes = (restTime + minutes) - (hours * 60);

    hours = hours < 10 ? "0" + hours : "" + hours;
    minutes = minutes < 10 ? "0" + minutes : "" + minutes;
    seconds = seconds < 10 ? "0" + seconds : "" + seconds;

    console.log(`${hours}:${minutes}:${seconds}`);
}
calculateTime(2564, 0.70, 5.5);