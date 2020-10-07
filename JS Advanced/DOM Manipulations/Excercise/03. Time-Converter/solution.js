function attachEventsListeners() {
    let daysInputEl = document.getElementById('days');
    let hoursInputEl = document.getElementById('hours');
    let minutesnputEl = document.getElementById('minutes');
    let secondsInputEl = document.getElementById('seconds');

    document.getElementById('daysBtn').addEventListener('click', () => { calculateTime(daysInputEl.value * 86400) });
    document.getElementById('hoursBtn').addEventListener('click', () => { calculateTime(hoursInputEl.value * 3600) });
    document.getElementById('minutesBtn').addEventListener('click', () => { calculateTime(minutesnputEl.value * 60) });
    document.getElementById('secondsBtn').addEventListener('click', () => { calculateTime(secondsInputEl.value) });

    function calculateTime(secs) {
        let days = secs / 86400;
        let hours = secs / 3600;
        let minutes = secs / 60;

        daysInputEl.value = days;
        hoursInputEl.value = hours;
        minutesnputEl.value = minutes;
        secondsInputEl.value = secs;
    }
}