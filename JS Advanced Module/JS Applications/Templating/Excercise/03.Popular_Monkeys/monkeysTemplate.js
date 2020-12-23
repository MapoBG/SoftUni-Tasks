let divEl = document.querySelector(".monkeys");
divEl.addEventListener("click", showInfo);

fetch('./monkeys.hbs')
    .then(res => res.text())
    .then(template => {
        let monkeysTemplate = Handlebars.compile(template);

        divEl.innerHTML = monkeysTemplate({ monkeys });
    })

function showInfo(event) {
    let infoBtn = event.target.textContent;

    if (infoBtn != "Info") {
        return;
    }

    let infoP = event.target.nextElementSibling;

    if (infoP.style.display == "block") {
        infoP.style.display = "none";
    } else {
        infoP.style.display = "block";

    }
}