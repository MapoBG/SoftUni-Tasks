function toggle() {
    let button = document.getElementsByClassName("button")[0];
    let text = document.getElementById("extra");

    if (button.innerHTML === "More") {
        button.innerHTML = "Less";
        text.setAttribute("style", "display: block");
    } else {
        button.innerHTML = "More";
        text.style.display = "none";
    }
}