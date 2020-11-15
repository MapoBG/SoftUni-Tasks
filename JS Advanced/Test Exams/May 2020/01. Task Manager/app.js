function solve() {
    let taskEl = document.getElementById("task");
    let descriptionEl = document.getElementById("description");
    let dateEl = document.getElementById("date");
    document.getElementById("add").addEventListener("click", addNewTask);
    let openDivEl = document.querySelector("div > section:nth-child(2) > div:nth-child(2)");
    let inProgressDivEl = document.getElementById("in-progress");
    let completeDivEl = document.querySelector(".wrapper").lastElementChild.lastElementChild;

    function addNewTask(e) {
        e.preventDefault();

        if (!taskEl.value || !descriptionEl.value || !dateEl.value) {
            return;
        }

        let articleEl = document.createElement("article");
        let h3El = document.createElement("h3");
        let pDescrEl = document.createElement("p");
        let pDateEl = document.createElement("p");
        let divEl = document.createElement("div");
        let startBtn = document.createElement("button");
        let delBtn = document.createElement("button");

        h3El.textContent = taskEl.value;
        pDescrEl.textContent = `Description: ${descriptionEl.value}`;
        pDateEl.textContent = `Due Date: ${dateEl.value}`;

        divEl.setAttribute("class", "flex");
        startBtn.setAttribute("class", "green");
        startBtn.textContent = "Start";
        delBtn.setAttribute("class", "red");
        delBtn.textContent = "Delete";

        divEl.appendChild(startBtn);
        divEl.appendChild(delBtn);

        articleEl.appendChild(h3El);
        articleEl.appendChild(pDescrEl);
        articleEl.appendChild(pDateEl);
        articleEl.appendChild(divEl);

        openDivEl.appendChild(articleEl);

        startBtn.addEventListener("click", moveArticle);
        delBtn.addEventListener("click", deleteArticle);

        function deleteArticle(e) {
            if (e.target.textContent == "Delete") {
                e.target.parentElement.parentElement.remove();
            }
        }

        function moveArticle(e) {
            let divEl = e.target.parentElement;
            let articleEl = divEl.parentElement;
            divEl.firstElementChild.remove();
            let finishBtn = document.createElement("button");
            finishBtn.setAttribute("class", "orange");
            finishBtn.textContent = "Finish";

            divEl.appendChild(finishBtn);

            inProgressDivEl.appendChild(articleEl);

            finishBtn.addEventListener("click", moveToComplete);

            function moveToComplete(e) {
                let divEl = e.target.parentElement;
                let articleEl = divEl.parentElement;
                divEl.remove();

                completeDivEl.appendChild(articleEl);
            }

        }
    }
}