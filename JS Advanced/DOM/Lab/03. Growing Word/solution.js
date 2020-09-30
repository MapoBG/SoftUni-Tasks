function growingWord() {
    let textToTransform = document.getElementById("exercise").lastElementChild;
    let px = 2;
    let colorChanges = {
        "blue": "green",
        "green": "red",
        "red": "blue"
    };

    if (!textToTransform.hasAttribute("style")) {
        textToTransform.setAttribute("style", `color:blue; font-size: ${px}px`);
    } else {
        let currentPx = textToTransform.style["font-size"];
        px = parseInt(currentPx) * 2;
        let currentColor = textToTransform.style.color;
        textToTransform.setAttribute("style", `color:${colorChanges[currentColor]}; font-size: ${px}px`)
    }
}