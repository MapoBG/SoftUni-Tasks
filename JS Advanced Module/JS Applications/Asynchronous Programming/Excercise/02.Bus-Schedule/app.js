function solve() {
    const departBtnEl = document.getElementById("depart");
    const arriveBtnEl = document.getElementById("arrive");
    const infoEl = document.querySelector(".info");

    let currentStop = "";
    let nextStop = "depot";

    async function depart() {
        try {
            const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStop}`);
            const data = await response.json();

            currentStop = data.name;
            nextStop = data.next;

            infoEl.textContent = `Next stop ${currentStop}`;

            departBtnEl.disabled = true;
            arriveBtnEl.disabled = false;
        } catch (error) {
            infoEl.textContent = "Error";
            departBtnEl.disabled = true;
            arriveBtnEl.disabled = true;
        }
    }

    function arrive() {
        infoEl.textContent = `Arriving at ${currentStop}`;

        departBtnEl.disabled = false;
        arriveBtnEl.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();