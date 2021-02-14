function solve() {
    document.querySelector(".form-control button").addEventListener("click", addNewLecture);

    function addNewLecture(e) {
        e.preventDefault();
        const modulesEl = document.querySelector(".modules");
        modulesEl.addEventListener("click", del);

        const formEl = e.target.parentElement.parentElement;
        const lecture = formEl.elements.namedItem("lecture-name").value;
        let date = formEl.elements.namedItem("lecture-date").value;
        const module = formEl.elements.namedItem("lecture-module").value;

        if (!lecture || !date || module == "Select module") {
            return;
        }

        while (date.includes("-")) {
            date = date.replace("-", "/");
        }

        date = date.replace("T", " - ");

        const modules = Array.from(document.querySelectorAll(".module"));
        const currentModuleInList = modules.find(div => {
            const h3 = div.firstElementChild;

            if (h3) {
                return h3.textContent == `${module.toUpperCase()}-MODULE`;
            }
        });

        const h3El = createEl("h3", `${module.toUpperCase()}-MODULE`);
        const ulEl = createEl("ul");
        const liEl = createEl("li", "", "flex");
        const h4El = createEl("h4", `${lecture} - ${date}`);
        const delBtnEl = createEl("button", "Del", "red");

        liEl.appendChild(h4El);
        liEl.appendChild(delBtnEl);

        if (currentModuleInList) {
            const ulEl = currentModuleInList.querySelector("ul");
            ulEl.appendChild(liEl);

            const liEls = Array.from(ulEl.querySelectorAll("li"));

            liEls.sort((li1, li2) => {
                li1Date = li1.firstElementChild.textContent.match(/\d+\/\d+\/\d+/)[0];
                li2Date = li2.firstElementChild.textContent.match(/\d+\/\d+\/\d+/)[0];

                return li1Date.localeCompare(li2Date);
            })
                .forEach(li => ulEl.appendChild(li));


        } else {
            const divEl = createEl("div", "", "module");

            ulEl.appendChild(liEl);
            divEl.appendChild(h3El);
            divEl.appendChild(ulEl);
            modulesEl.appendChild(divEl);
        }
    }

    function del(e) {
        if (e.target.tagName != "BUTTON") {
            return;
        }

        const liEl = e.target.parentElement;

        if (!liEl.nextElementSibling && !liEl.previousElementSibling) {
            liEl.parentElement.parentElement.remove();
        } else {
            liEl.remove();
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
};