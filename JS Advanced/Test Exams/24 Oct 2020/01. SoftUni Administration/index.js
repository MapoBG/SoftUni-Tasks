function solve() {
    let addBtnEl = document.querySelector("form > div > button").addEventListener('click', getInfo);
    let inputEls = Array.from(document.querySelectorAll("form > div > input"));
    let selectEl = document.querySelector("div > select");
    let trainingModulesEl = document.querySelector(".modules");
    let modules = [];

    function getInfo(e) {
        e.preventDefault();
        let [lectureNameFiled, dateField] = inputEls;

        if (lectureNameFiled.value == "" || dateField.value == "") {
            return
        }

        if (selectEl.value == "Select module") {
            return
        }

        let headerH3El = document.createElement("h3");
        headerH3El.textContent = selectEl.value.toUpperCase() + "-MODULE";
        let divEl = document.createElement("div");
        divEl.setAttribute("class", "module");
        divEl.appendChild(headerH3El);
        let ulEl = document.createElement("ul");
        let liEl = document.createElement("li");
        liEl.setAttribute("class", "flex");
        let headerH4El = document.createElement("h4");
        let dateValue = dateField.value;

        while (dateValue.includes("-")) {
            dateValue = dateValue.replace("-", "/");
        }

        dateValue = dateValue.replace("T", " - ");
        headerH4El.textContent = `${lectureNameFiled.value} - ${dateValue}`;
        let delBtn = document.createElement("button");
        delBtn.textContent = "Del";
        delBtn.setAttribute("class", "red");

        liEl.appendChild(headerH4El);
        liEl.appendChild(delBtn);

        if (modules.includes(selectEl.value) && modules.length > 0) {
            let trainingDivEls = Array.from(document.querySelectorAll(".module"));
            for (let curDivEl of trainingDivEls) {
                let h3El = curDivEl.firstElementChild;
                if (headerH3El.textContent == h3El.textContent) {
                    let curUlEl = curDivEl.lastElementChild;
                    curUlEl.appendChild(liEl);
                    let liElArr = Array.from(curUlEl.querySelectorAll("li"));
                    liElArr.sort((li1, li2) => {
                        let index1 = li1.querySelector("h4").textContent.indexOf("-") + 2;
                        let index2 = li2.querySelector("h4").textContent.indexOf("-") + 2;
                        console.log(li1.querySelector("h4").textContent.slice(index1));
                        console.log(li2.querySelector("h4").textContent.slice(index2));
                        li1.querySelector("h4").textContent.slice(index1).localeCompare(li2.querySelector("h4").textContent.slice(index2))
                    })
                    liElArr.forEach(el => curUlEl.appendChild(el))
                }
            }
        } else {
            ulEl.appendChild(liEl);
            divEl.appendChild(ulEl);
            trainingModulesEl.appendChild(divEl);
            modules.push(selectEl.value);
        }

        delBtn.addEventListener('click', deleteTraining);

        function deleteTraining(e) {
            let liToRemove = e.target.parentElement;
            if (!liToRemove.nextElementSibling || !liToRemove.previousElementSibling) {
                liToRemove.parentElement.parentElement.remove();
            } else {
                liToRemove.remove();
            }

        }
    }

};