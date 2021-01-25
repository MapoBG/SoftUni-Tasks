function solve() {
  let inputText = document.getElementById("text").value.toLocaleLowerCase().split(" ");
  let convention = document.getElementById("naming-convention").value;

  let result = "";

  if (convention == "Camel Case") {
    result = inputText[0] + inputText.slice(1).map(word => word[0].toLocaleUpperCase() + word.slice(1)).join("");
  } else if (convention == "Pascal Case") {
    result = inputText.map(word => word[0].toLocaleUpperCase() + word.slice(1)).join("");
  } else {
    result = "Error!";
  }

  document.getElementById("result").textContent = result;
}