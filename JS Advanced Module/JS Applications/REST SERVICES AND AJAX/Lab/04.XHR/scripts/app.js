function loadRepos() {
   const repoUrl = "https://api.github.com/users/testnakov/repos";
   let divEl = document.getElementById("res");

   //=============== Basic Way =====================
   let request = new XMLHttpRequest();
   request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         divEl.textContent = this.responseText;
      }
   };
   request.open("GET", repoUrl);
   request.send();


   //================ New Way =====================
   // fetch(repoUrl)
   //    .then(response => response.json())
   //    .then(data => divEl.textContent = JSON.stringify(data));
}