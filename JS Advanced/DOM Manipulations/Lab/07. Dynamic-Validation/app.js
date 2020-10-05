function validate() {
    let inputFieldElement = document.getElementById('email');

    inputFieldElement.addEventListener('change', checkEmail);

    function checkEmail(e) {
        let inputFieldValue = inputFieldElement.value;
        let regEx = /^[a-z]+@[a-z]+\.[a-z]+$/g;
        let testEmail = inputFieldValue.match(regEx);

        if (testEmail) {
            inputFieldElement.classList.remove('error');
        } else {
            inputFieldElement.classList.add('error');
        }
    }
}