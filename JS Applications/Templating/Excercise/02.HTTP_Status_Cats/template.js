(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        let catsTemplateEl = document.getElementById("cat-template").innerHTML;
        let ulEl = document.querySelector("#allCats ul");
        ulEl.addEventListener("click", showInfo);

        let catsTemplate = Handlebars.compile(catsTemplateEl);

        ulEl.innerHTML = catsTemplate({ cats });

    }

    function showInfo(event) {
        if (!event.target.classList.contains("showBtn")) {
            return;
        }

        let infoEl = event.target.nextElementSibling;
        
        if(infoEl.style.display == "none"){
            infoEl.style.display = "block";
            event.target.textContent = "Hide status code"
        } else {
            infoEl.style.display = "none";
            event.target.textContent = "Show status code"
        }
    }
})()
