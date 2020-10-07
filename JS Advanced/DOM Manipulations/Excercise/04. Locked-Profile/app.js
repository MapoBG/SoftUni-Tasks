function lockedProfile() {
    let buttonsEls = document.getElementsByTagName('button');

    buttonsEls = Array.from(buttonsEls);
    buttonsEls.forEach(button => {
        button.addEventListener('click', showHideInfo);
    });

    function showHideInfo(e) {
        let hiddenFiled = e.target.previousElementSibling;
        let radioBtnLocked = e.target.parentElement.querySelector('input')

        if (!radioBtnLocked.checked && e.target.innerText == 'Show more') {
            hiddenFiled.style = 'display: inline';
            e.target.innerText = "Hide it";
        }else if(!radioBtnLocked.checked && e.target.innerText == 'Hide it'){
            hiddenFiled.style = 'display: none';
            e.target.innerText = 'Show more';
        }
    }
}