function solve() {
   let tableEl = document.getElementsByClassName('minimalistBlack')[0].lastElementChild

   tableEl.addEventListener('click', select);

   function select(e) {
      if (e.target.parentElement.style.backgroundColor != "rgb(65, 63, 94)") {
         e.target.parentElement.style.backgroundColor = "rgb(65, 63, 94)";
      } else if (e.target.parentElement.style.backgroundColor == "rgb(65, 63, 94)") {
         e.target.parentElement.style.backgroundColor = "";
      }

      Array.from(tableEl.children).forEach(tRow => {
         if (e.target.parentElement != tRow) {
            tRow.style.backgroundColor = "";
         }
      })
   }
}