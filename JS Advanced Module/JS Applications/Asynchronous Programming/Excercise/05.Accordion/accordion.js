async function toggle() {
    const res = await fetch("http://localhost:3030/jsonstore/advanced/articles/list");
    const titles = await res.json();

    const accordionEl = document.getElementById("main");
    accordionEl.innerHTML = "";

    titles.forEach(title => {
        const article = createEl("div", "", { class: "accordion" },
            createEl("div", "", { class: "head" },
                createEl("span", title.title),
                createEl("button", "More", { class: "button", id: title._id })));

        accordionEl.appendChild(article);
    });
}

toggle();

function createEl(type, text, attributes = {}, ...elements) {
    const result = document.createElement(type);

    if (text) {
        result.textContent = text;
    }

    if (attributes) {
        Object.keys(attributes).forEach(a => {
            result.setAttribute(a, attributes[a]);
        });
    }

    if (attributes.class == "button") {
        result.addEventListener("click", showInfo);
    }

    elements.forEach(e => result.appendChild(e));

    return result;
}

async function showInfo(e) {
    const buttonEl = e.target;

    if (buttonEl.textContent == "More") {
        buttonEl.textContent = "Less";

        const articleRes = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${buttonEl.id}`);
        const articleInfo = await articleRes.json();

        const extra = createEl("div", "", { class: "extra" },
            createEl("p", articleInfo.content, {}));

        extra.style.display = "block";

        buttonEl.parentElement.parentElement.appendChild(extra);

    } else {
        buttonEl.textContent = "More";
        buttonEl.parentElement.nextElementSibling.remove();
    }
}