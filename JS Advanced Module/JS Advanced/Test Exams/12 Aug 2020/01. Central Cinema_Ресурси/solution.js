function solve() {
    document.querySelector("#container button").addEventListener("click", addMovie);
    let [nameEl, hallEl, ticketPriceEl] = Array.from(document.querySelectorAll("#container input"));
    let moviesSectionUlEl = document.querySelector("#movies ul");
    let archiveSectionUlEl = document.querySelector("#archive ul");
    document.querySelector("#archive button").addEventListener("click", clearAll);

    function addMovie(e) {
        e.preventDefault();
        if (!nameEl.value || !hallEl.value || !ticketPriceEl.value || !Number(ticketPriceEl.value)) {
            return;
        }

        let liEl = document.createElement("li");
        let spanEl = document.createElement("span");
        let strongEl = document.createElement("strong");
        let divEl = document.createElement("div");
        let divStrongEl = document.createElement("strong");
        let divInputEl = document.createElement("input");
        let divBtnEl = document.createElement("button");

        spanEl.textContent = nameEl.value;
        strongEl.textContent = "Hall: " + hallEl.value;
        divStrongEl.textContent = Number(ticketPriceEl.value).toFixed(2);
        divInputEl.setAttribute("placeholder", "Tickets Sold");
        divBtnEl.textContent = "Archive";
        divBtnEl.addEventListener("click", moveToArchive);

        divEl.appendChild(divStrongEl);
        divEl.appendChild(divInputEl);
        divEl.appendChild(divBtnEl);

        liEl.appendChild(spanEl);
        liEl.appendChild(strongEl);
        liEl.appendChild(divEl);

        moviesSectionUlEl.appendChild(liEl);

        nameEl.value = "";
        hallEl.value = "";
        ticketPriceEl.value = "";

        function moveToArchive(e) {
            let newLiEl = document.createElement("li");

            let divParentEl = e.target.parentElement;
            let LiParentEl = divParentEl.parentElement;

            let liSpanEl = LiParentEl.firstElementChild;
            let newLiStrongEl = document.createElement("strong");
            let newLiSpanEl = document.createElement("span");

            let divInputEl = divParentEl.querySelector("input");
            let divStrongEl = divParentEl.querySelector("strong");
            let totalPrice = (Number(divInputEl.value) * Number(divStrongEl.textContent)).toFixed(2);

            if (!divInputEl.value || !Number(divInputEl.value)) {
                return;
            }

            let delBtnEl = document.createElement("button");
            delBtnEl.textContent = "Delete";
            delBtnEl.addEventListener("click", deleteRow);

            newLiStrongEl.textContent = `Total amount: ${totalPrice}`;
            newLiSpanEl.textContent = liSpanEl.textContent;

            newLiEl.appendChild(newLiSpanEl);
            newLiEl.appendChild(newLiStrongEl);
            newLiEl.appendChild(delBtnEl);
            moviesSectionUlEl.removeChild(LiParentEl);
            archiveSectionUlEl.appendChild(newLiEl);



            function deleteRow(e) {
                let liEl = e.target.parentElement;
                liEl.parentElement.remove(liEl);
            }
        }
    }

    function clearAll(e) {
        let ulEl = e.target.parentElement.querySelector("ul");
        ulEl.innerHTML = "";
    }
}