function solution() {
    document.querySelector(".card > div > button").addEventListener("click", addGift);
    const giftsUlEl = document.querySelector(".card ul");
    giftsUlEl.addEventListener("click", moveItem);

    function addGift(e) {
        const inputEl = e.target.previousElementSibling;

        if (!inputEl.value) {
            return;
        }

        const liEl = createEl("li", inputEl.value, "gift");
        const sendBtnEl = createEl("button", "Send", "sendButton");
        const discardBtnEl = createEl("button", "Discard", "discardButton");

        liEl.appendChild(sendBtnEl);
        liEl.appendChild(discardBtnEl);
        giftsUlEl.appendChild(liEl);

        Array.from(giftsUlEl.children)
            .sort((e1, e2) => e1.textContent.localeCompare(e2.textContent))
            .forEach(e => giftsUlEl.appendChild(e));

        inputEl.value = "";
    }

    function moveItem({ target }) {
        if (target.tagName != "BUTTON") {
            return;
        }

        const liEl = target.parentElement;
        const newLiEl = createEl("li", liEl.childNodes[0].textContent, "gift");
        liEl.remove();

        if (target.textContent == "Send") {
            document.querySelector("div > section:nth-child(3) > ul").appendChild(newLiEl);
        } else if (target.textContent == "Discard") {
            document.querySelector("div > section:nth-child(4) > ul").appendChild(newLiEl);
        }
    }

    function createEl(el, text, className) {
        const element = document.createElement(el);

        if (text) {
            element.textContent = text;
        }

        if (className) {
            element.classList.add(className);
        }

        return element;
    }
}