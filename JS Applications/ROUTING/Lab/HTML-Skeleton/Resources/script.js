document.querySelector("nav ul").addEventListener("click", changeRoute);
let formEl = document.getElementById("create-form");
formEl.addEventListener("submit", submitForm);

let baseUrl = "https://furniture-store-a4d54-default-rtdb.firebaseio.com/furniture/";

const pathMap = {
    "/home": document.getElementById("home-section"),
    "/create": document.getElementById("create-section"),
    "/details": document.getElementById("details-section"),
    "/profile": document.getElementById("profile-section"),
}


const router = (path, key) => {
    Object
        .values(pathMap)
        .forEach(section => section.style.display = "none");

    pathMap[location.pathname].style.display = "block";

    switch (path) {
        case "/home":
            renderHomePage();
            break;
        case "/details":
            renderDetailsPage(key);
            break;
    }
}

function renderDetailsPage(key) {
    pathMap["/details"].innerHTML = "";

    fetch("./item-details-template.hbs")
        .then(res => res.text())
        .then(template => {
            let furnitureTemplate = Handlebars.compile(template);

            fetch(baseUrl + `create/${key}.json`)
                .then(res => res.json())
                .then(item => {
                    pathMap["/details"].innerHTML += furnitureTemplate(item)
                })
        })
}

function renderHomePage() {
    let itemsContainerEl = document.getElementById("items-container");
    itemsContainerEl.addEventListener("click", changeRoute);

    itemsContainerEl.innerHTML = "";

    fetch("./template.hbs")
        .then(res => res.text())
        .then(template => {
            let furnitureTemplate = Handlebars.compile(template);

            fetch(baseUrl + ".json")
                .then(res => res.json())
                .then(items => {
                    let temp = Object.values(items)[0];
                    Object.values(temp)
                        .forEach(item => {
                            itemsContainerEl.innerHTML += furnitureTemplate(item);
                        })
                })
        })
}

function changeRoute(event) {
    event.preventDefault();

    if (event.target.tagName != "A") {
        return;
    }

    history.pushState({}, "", event.target.href);

    let key = event.target.id;

    router(location.pathname, key);
}

function submitForm(event) {
    event.preventDefault();

    let makeVal = document.getElementById("new-make").value;
    let priceVal = document.getElementById("new-price").value;
    let modelVal = document.getElementById("new-model").value;
    let imageVal = document.getElementById("new-image").value;
    let yearVal = document.getElementById("new-year").value;
    let materialVal = document.getElementById("new-material").value;
    let descriptionVal = document.getElementById("new-description").value;

    let newItem = {
        makeVal,
        priceVal,
        modelVal,
        imageVal,
        yearVal,
        materialVal,
        descriptionVal,
    }

    if (checkFormData(newItem) == 0) {
        return;
    }

    fetch(baseUrl + "create/.json", {
        method: "POST",
        body: JSON.stringify(newItem),
    })
        .then(res => res.json())
        .then(id => {
            newItem.id = id.name;
            fetch(baseUrl + `create/${newItem.id}.json`, {
                method: "PUT",
                body: JSON.stringify(newItem)
            })
        })

    redirectToHome();
}

function checkFormData(itemObj) {
    if (itemObj.makeVal.length < 4) {
        return 0;
    }
    if (itemObj.modelVal.length < 4) {
        return 0;
    }
    if (itemObj.yearVal < 1950 || itemObj.yearVal > 2050) {
        return 0;
    }
    if (itemObj.descriptionVal.length < 11) {
        return 0;
    }
    if (itemObj.priceVal <= 0) {
        return 0;
    }
    if (itemObj.imageVal == "") {
        return 0;
    }

    return 1;
}

function redirectToHome() {
    pathMap[location.pathname].style.display = "none";
    pathMap["/home"].style.display = "block";
    history.pushState({}, "", "home");

    renderHomePage();
}

router(location.pathname);