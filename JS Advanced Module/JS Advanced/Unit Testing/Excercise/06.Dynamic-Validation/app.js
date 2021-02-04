function validate() {
    const inputEl = document.getElementById("email");
    inputEl.addEventListener("change", onChange);

    function onChange(e) {
        if (!inputEl.value.match(/[a-z]+@[a-z]+\.[a-z]+/g)) {
            inputEl.classList.add("error");
        } else {
            inputEl.classList.remove("error");
        }
    }
}