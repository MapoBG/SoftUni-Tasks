function solve() {
  let textToFormat = document.getElementById("input").innerHTML.split(".");
  let formatedFieldElement = document.getElementById("output");

  for (let i = 0; i < textToFormat.length; i += 3) {
    let sentences = textToFormat.slice(i, i + 3).filter(x => x !== "");
    let newParagraph = document.createElement("p")
    newParagraph.innerHTML = sentences.join(".") + ".";
    formatedFieldElement.appendChild(newParagraph);
  }
}