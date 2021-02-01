function solve() {
    document.querySelector("#container button").addEventListener("click", addMovie);
    document.querySelector("#archive button").addEventListener("click", clear);

    function addMovie(e) {
        e.preventDefault();

        const [nameEl, hallEl, priceEl] = Array.from(document.querySelectorAll("#container input"));
        const name = nameEl.value;
        const hall = hallEl.value;
        const price = Number(priceEl.value);

        if (!name || !hall || !price) {
            return;
        }

        const moviesListEl = document.querySelector("#movies ul");
        moviesListEl.addEventListener("click", archivate);

        const li = createElement("li");
        const span = createElement("span", name);
        const strongHall = createElement("strong", `Hall: ${hall}`);
        const div = createElement("div");
        const strongPrice = createElement("strong", price.toFixed(2));
        const button = createElement("button", "Archive");
        const input = createElement("input");
        input.setAttribute("placeholder", "Tickets Sold");

        div.appendChild(strongPrice);
        div.appendChild(input);
        div.appendChild(button);

        li.appendChild(span);
        li.appendChild(strongHall);
        li.appendChild(div);

        moviesListEl.appendChild(li);

        nameEl.value = "";
        hallEl.value = "";
        priceEl.value = "";
    }

    function archivate(e) {
        const divEl = e.target.parentElement;
        const inputEl = divEl.querySelector("input");
        const ticketsSold = Number(inputEl.value);


        if (!ticketsSold) {
            return;
        }

        const liEl = divEl.parentElement;
        const price = Number(divEl.querySelector("strong").textContent);

        divEl.remove();
        liEl.appendChild(createElement("button", "Delete"));

        liEl.querySelector("strong").textContent = `Total amount: ${(ticketsSold * price).toFixed(2)}`;
        document.querySelector("#archive ul").appendChild(liEl);
    }

    function createElement(element, content) {
        const newEl = document.createElement(element);

        if (content == undefined) {
            content = "";
        }

        if (element == "input" || element == "textarea") {
            newEl.value = content;
        } else if (element == "button") {
            newEl.textContent = content;
            addEvent(newEl);
        } else {
            newEl.textContent = content;
        }

        return newEl;
    }

    function clear(e) {
        e.target.previousElementSibling.innerHTML = "";
    }

    function del(e) {
        e.target.parentElement.remove();
    }

    function addEvent(element) {
        const buttonName = element.textContent;

        if (buttonName == "Delete") {
            element.addEventListener("click", del);
        } else if (buttonName == "Archive") {
            element.addEventListener("click", archivate);
        }
    }
}