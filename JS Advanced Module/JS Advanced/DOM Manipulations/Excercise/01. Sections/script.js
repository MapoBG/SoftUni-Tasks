function create(words) {
   let contentEl = document.getElementById('content');
   
   words.forEach(word => {
      let divElement = document.createElement('div');
      let pElement = document.createElement('p');

      pElement.textContent = word;
      pElement.style = 'display: none;'
      divElement.addEventListener('click', showText);

      divElement.appendChild(pElement);
      contentEl.appendChild(divElement);
   });

   function showText(e) {
      e.target.firstChild.style = 'display: block';
   }
}