function getArticleGenerator(articles) {
    const mainDiv = document.getElementById("content");

    function getNextArticle() {
        if (articles.length > 0) {
            const nextArticle = articles.shift();
            const divEl = document.createElement("article");
            
            divEl.textContent = nextArticle;
            mainDiv.appendChild(divEl);
        }
    }

    return getNextArticle;
}