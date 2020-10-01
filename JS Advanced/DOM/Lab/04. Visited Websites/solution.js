function solve() {
  let clickableElements = document.querySelectorAll("a");

/*   clickableElements.forEach(a => a.addEventListener("click", addCount)); */

  for (let aElement of clickableElements) {
    aElement.addEventListener("click", addCount);
  }

  function addCount(event) {
    let clikedSite = event.target.parentElement.parentElement;
    let clikedSiteParagraph = clikedSite.querySelector("p");                      //filter all but Numbers(including 0)!!!
    let clickCounter = clikedSiteParagraph.innerHTML.split(" ").map(e => Number(e)).filter(x => !isNaN(x))[0];

    clikedSiteParagraph.innerHTML = `visited ${++clickCounter} times `;
  }
}