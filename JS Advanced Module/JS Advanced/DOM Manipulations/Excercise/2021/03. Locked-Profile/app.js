function lockedProfile() {
    document.getElementById("main").addEventListener("click", showHideInfo);

    function showHideInfo(e) {

        if (e.target.tagName != "BUTTON") {
            return;
        }

        const hiddenFiled = e.target.previousElementSibling;
        const radioBtnLocked = e.target.parentElement.querySelector('input');

        if (!radioBtnLocked.checked && e.target.textContent == 'Show more') {
            hiddenFiled.style = 'display: inline';
            e.target.textContent = "Hide it";
        } else if (!radioBtnLocked.checked && e.target.textContent == 'Hide it') {
            hiddenFiled.style = 'display: none';
            e.target.textContent = 'Show more';
        }
    }
}