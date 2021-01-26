function create(words) {
   const contentEl = document.getElementById("content");
   contentEl.addEventListener("click", showContent);

   words.forEach(word => {
      const divEl = document.createElement("div");
      const pEl = document.createElement("p");
      pEl.textContent = word;
      pEl.style.display = "none";

      divEl.appendChild(pEl);
      contentEl.appendChild(divEl);
   });

   function showContent(e) {

      if (e.target.tagName == "DIV") {
         e.target.firstElementChild.style.display = "block";
      }
   }
}