function notify(message) {
    let notifyBtnEl = document.getElementsByTagName('button')[0];
    let notificationDivEl = document.getElementById('notification');
    notificationDivEl.textContent = message;
    notificationDivEl.style.display = 'block';

    setTimeout(() => notificationDivEl.style.display = 'none', 2000)
}