async function getInfo() {
    const busStop = document.getElementById("stopId").value;
    const busStopNameEl = document.getElementById("stopName");
    const ulBusesEl = document.getElementById("buses");

    try {
        ulBusesEl.textContent = "";

        const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${busStop}`);
        const data = await response.json();

        busStopNameEl.textContent = data.name;

        Object.keys(data.buses).forEach(busId => {
            const liEl = document.createElement("li");
            liEl.textContent = `Bus ${busId} arrives in ${data.buses[busId]} minutes`;
            ulBusesEl.appendChild(liEl);
        });
    } catch (error) {
        busStopNameEl.textContent = "Error";
    }
}