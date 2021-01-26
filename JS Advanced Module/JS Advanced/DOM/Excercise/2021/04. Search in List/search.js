function search() {
   const inputText = document.getElementById("searchText").value;
   let townsLiEls = Array.from(document.getElementsByTagName("li"));

   let result = townsLiEls.filter(town => town.textContent.includes(inputText)).map(town => {
      town.style.textDecoration = "underline";
      town.style.fontWeight = "bold";
   });

   document.getElementById("result").textContent = `${result.length} matches found`;
}