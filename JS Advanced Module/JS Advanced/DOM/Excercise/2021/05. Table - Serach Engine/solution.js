function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      let inputText = document.getElementById("searchField").value;
      let fieldsEls = Array.from(document.querySelectorAll(".container td"));

      fieldsEls.forEach(element => element.parentElement.className = "");

      fieldsEls
         .filter(element => element.textContent.includes(inputText))
         .forEach(element => element.parentElement.className = "select");
   }
}