function solve() {
   document.getElementById('searchBtn').addEventListener('click', search);

   function search() {
      let tableRowsEls = document.querySelectorAll('tbody > tr');
      let inputFiledEl = document.getElementById('searchField');
      let tableDataEls = document.querySelectorAll('tbody > tr > td');
      tableDataEls = Array.from(tableDataEls);
      tableRowsEls = Array.from(tableRowsEls);
      tableRowsEls.forEach(e => e.classList.remove('select'));

      for (let data of tableDataEls) {
         if (data.textContent.includes(inputFiledEl.value)) {
            data.parentElement.classList.add('select');
         }
      }
      inputFiledEl.value = "";
   }
}