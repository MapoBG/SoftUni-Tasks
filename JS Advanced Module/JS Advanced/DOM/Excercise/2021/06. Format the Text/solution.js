function solve() {
  let inputText = document.getElementById("input").value.split(".").filter(char => char);
  let result = "";

  for (let i = 0; i < inputText.length; i += 3) {
    const text = inputText.slice(i, i + 3).join(".") + ".";
    result += `<p>${text}</p>`;
  }

  document.getElementById("output").innerHTML = result;
}