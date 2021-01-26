function attachEventsListeners() {
    const daysInputEl = document.getElementById('days');
    const hoursInputEl = document.getElementById('hours');
    const minutesnputEl = document.getElementById('minutes');
    const secondsInputEl = document.getElementById('seconds');

    document.getElementById('daysBtn').addEventListener('click', () => { calculateTime(Number(daysInputEl.value) * 86400) });
    document.getElementById('hoursBtn').addEventListener('click', () => { calculateTime(Number(hoursInputEl.value) * 3600) });
    document.getElementById('minutesBtn').addEventListener('click', () => { calculateTime(Number(minutesnputEl.value) * 60) });
    document.getElementById('secondsBtn').addEventListener('click', () => { calculateTime(Number(secondsInputEl.value)) });

    function calculateTime(secs) {
        const days = secs / 86400;
        const hours = secs / 3600;
        const minutes = secs / 60;

        daysInputEl.value = days;
        hoursInputEl.value = hours;
        minutesnputEl.value = minutes;
        secondsInputEl.value = secs;
    }
}