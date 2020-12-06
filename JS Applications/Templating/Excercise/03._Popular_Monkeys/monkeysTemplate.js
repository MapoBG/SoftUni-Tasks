$(() => {
    let monkeysTemplateEl = document.getElementById("monkey-template").innerHTML;
    let divEl = document.querySelector(".monkeys");
    divEl.addEventListener("click", showInfo);
    let monkeysTemplate = Handlebars.compile(monkeysTemplateEl);

    divEl.innerHTML = monkeysTemplate({ monkeys });

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
})