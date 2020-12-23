function focus() {
    let inputElements = document.getElementsByTagName('input');

    inputElements = Array.from(inputElements);

    inputElements.forEach(x => x.addEventListener('focus', inputSelect));

    function inputSelect(e) {
        let divElements = document.getElementsByTagName('div');

        divElements = Array.from(divElements);

        divElements.forEach(x => x.classList.remove('focused'));

        e.target.parentElement.classList.add('focused');
    }
}