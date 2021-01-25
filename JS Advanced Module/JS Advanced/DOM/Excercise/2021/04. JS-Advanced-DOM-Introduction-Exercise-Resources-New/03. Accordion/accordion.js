function toggle() {
    let buttonEl = document.querySelector("span");
    let extraContent = document.getElementById("extra");

    if (buttonEl.textContent == "More") {
        extraContent.style.display = "block";
        buttonEl.textContent = "Less";
    } else {
        extraContent.style.display = "none";
        buttonEl.textContent = "More";
    }
}