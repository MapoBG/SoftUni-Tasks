function solve() {
    let buttonElement = document.getElementById("dropdown");
    let ulElement = document.getElementById("dropdown-ul");
    let boxElement = document.getElementById("box");

    ulElement.addEventListener("click", changeColor)
    buttonElement.addEventListener("click", clicked);

    function clicked() {
        if (ulElement.style.display != "block") {
            ulElement.style.display = "block";
        } else {
            ulElement.style.display = "none";
            boxElement.style.color = "white";
            boxElement.style["background-color"] = "black";
        }
    }

    function changeColor(e) {
        boxElement.style["background-color"] = e.target.innerHTML;
        boxElement.style.color = "black";
    }
}