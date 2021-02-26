function attachEvents() {
    document.getElementById("submit").addEventListener("click", getWeather);
}

attachEvents();

async function getWeather() {
    const forecastDiv = document.getElementById("forecast");
    const currentDivEl = document.getElementById("current");
    const searchLocation = document.getElementById("location").value;
    const upcomingEl = document.getElementById("upcoming");

    try {
        const res = await fetch("http://localhost:3030/jsonstore/forecaster/locations");
        const data = await res.json();

        const result = data.find(e => e.name == searchLocation);

        const [cRes, fRes] = await Promise.all([
            fetch(`http://localhost:3030/jsonstore/forecaster/today/${result.code}`),
            fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${result.code}`)
        ]);

        const [conditionsData, forecastData] = await Promise.all([cRes.json(), fRes.json()]);

        const conditions = {
            "Sunny": "☀", // ☀
            "Partly sunny": "⛅", // ⛅
            "Overcast": "☁", // ☁
            "Rain": "☂", // ☂
            "Degrees": "°"   // °
        };

        let icon = conditions[conditionsData.forecast.condition];

        const currentConditions = createEl("div", "", ["forecasts"],
            createEl("span", icon, ["condition", "symbol"]),
            createEl("span", "", ["condition"],
                createEl("span", conditionsData.name, ["forecast-data"]),
                createEl("span", `${conditionsData.forecast.low}°/${conditionsData.forecast.high}°`, ["forecast-data"]),
                createEl("span", conditionsData.forecast.condition, ["forecast-data"])));

        clearForecast(currentDivEl);

        currentDivEl.appendChild(currentConditions);

        forecastDiv.style.display = "";

        const aheadDiv = createEl("div", "", ["forecast-info"]);

        forecastData.forecast.forEach(f => {
            icon = conditions[f.condition];

            const forecastAhead = createEl("span", "", ["upcoming"],
                createEl("span", icon, ["symbol"]),
                createEl("span", `${f.low}°/${f.high}°`, ["forecast-data"]),
                createEl("span", f.condition, ["forecast-data"]));

            aheadDiv.appendChild(forecastAhead);
        });

        clearForecast(upcomingEl);

        upcomingEl.appendChild(aheadDiv);

    } catch (err) {
        displayError();
    }

    function displayError() {
        clearForecast(currentDivEl);
        clearForecast(upcomingEl);

        forecastDiv.style.display = "";
        const textNode = document.createTextNode("Error");
        currentDivEl.appendChild(textNode);
    }
}

function createEl(type, text, classNames, ...elements) {
    const result = document.createElement(type);

    if (text) {
        result.textContent = text;
    }

    if (classNames) {
        classNames.forEach(c => result.classList.add(c));
    }

    elements.forEach(e => result.appendChild(e));
    return result;
}

function clearForecast(currentDivEl) {
    const persistentEl = currentDivEl.removeChild(currentDivEl.firstElementChild);

    currentDivEl.innerHTML = "";

    currentDivEl.appendChild(persistentEl);
}