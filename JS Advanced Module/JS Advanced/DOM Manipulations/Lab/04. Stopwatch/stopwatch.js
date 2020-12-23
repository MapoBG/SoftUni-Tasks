function stopwatch() {
    let startBtnnEl = document.getElementById('startBtn');
    let stopBtnEl = document.getElementById('stopBtn');
    let timerEl = document.getElementById('time');

    startBtnnEl.addEventListener('click', startTimer);
    stopBtnEl.addEventListener('click', endTimer);

    function startTimer() {
        timerEl.textContent = '00:00';
        startBtnnEl.disabled = true;
        stopBtnEl.disabled = false;
        interval();
    }

    function endTimer() {
        startBtnnEl.disabled = false;
        stopBtnEl.disabled = true;
        clearInterval(iinterval);
    }

    function interval() {
        iinterval = setInterval(function () {
            timer = timerEl.textContent;
            let [minutes, seconds] = timer.split(":");
            minutes = Number(minutes);
            seconds = Number(seconds);
            seconds++;
            if (seconds == 60) {
                seconds = 0;
                minutes++;
            }
            if (seconds < 10) {
                seconds = `0${seconds}`;
            } 
            if (minutes < 10) {
                minutes = `0${minutes}`;
            }
                timerEl.textContent = `${minutes}:${seconds}`;
        }, 1000);
    }
}