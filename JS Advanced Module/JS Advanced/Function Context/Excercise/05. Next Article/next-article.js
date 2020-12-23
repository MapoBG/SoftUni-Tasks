function getArticleGenerator(articles) {
    let mainDiv = document.getElementById("content");

    function getNextArticle() {
        if (articles.length > 0) {
            let nextArticle = articles.shift();
            let divEl = document.createElement("article");
            
            divEl.textContent = nextArticle;
            mainDiv.appendChild(divEl);
        }
    }

    return getNextArticle;
}