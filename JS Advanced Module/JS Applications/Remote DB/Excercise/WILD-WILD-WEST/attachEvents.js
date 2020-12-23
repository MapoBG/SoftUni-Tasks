let baseURL = "https://wild-wild-west-cce2c-default-rtdb.firebaseio.com/players/";
let playersEl = document.getElementById("players");
let saveBtn = document.getElementById("save");
let reloadBtn = document.getElementById("reload");
let currentPlayer = {};

function attachEvents() {
    document.getElementById("addPlayer").addEventListener("click", addNewPlayer);
    playersEl.addEventListener("click", getAction);
    saveBtn.addEventListener("click", saveGame);
    reloadBtn.addEventListener("click", reloadWpn);
}

function getAction(event) {
    event.preventDefault();

    if (event.target.textContent == "Play") {
        playGame(event);
    } else if (event.target.textContent == "Delete") {
        deletePlayer(event);
    }
}

function addNewPlayer() {
    let nameInputEl = document.getElementById("addName");

    if (nameInputEl.value.length < 3) {
        return;
    }

    let newPlayer = {
        name: nameInputEl.value,
        money: 500,
        bullets: 6,
    }

    fetch(baseURL + ".json", {
        method: "POST",
        body: JSON.stringify(newPlayer),
    })
        .then(res => res.json())
        .then(playerKey => updatePlayer(playerKey))
        .then(reloadPlayers)
        .then(nameInputEl.value = "")
}

function getPlayers(dataObj) {
    Object.keys(dataObj).forEach(key => {
        let formEl = document.createElement("form");
        let template = Handlebars.compile(document.getElementById("player-template").innerHTML);

        formEl.setAttribute("id", key)
        formEl.innerHTML = template(dataObj[key]);
        playersEl.appendChild(formEl);
    });
}

function reloadPlayers() {
    playersEl.innerHTML = "";

    fetch(baseURL + ".json")
        .then(res => res.json())
        .then(players => getPlayers(players))
}
reloadPlayers();

function deletePlayer(event) {
    let playerID = event.path[1].id;

    fetch(baseURL + `${playerID}.json`, {
        method: "DELETE",
    })
        .then(reloadPlayers)
}

function playGame(event) {
    let playerID = event.path[1].id;

    clearInterval(canvas.intervalId);

    canvas.style.display = "block";
    saveBtn.style.display = "inline-block"
    reloadBtn.style.display = "inline-block"

    fetch(baseURL + `${playerID}.json`)
        .then(res => res.json())
        .then(player => {
            loadCanvas(player);
            currentPlayer = player;
            currentPlayer.id = playerID;
        })
}

function saveGame() {
    fetch(baseURL + currentPlayer.id + ".json", {
        method: "PUT",
        body: JSON.stringify(currentPlayer),
    })
        .then(reloadPlayers)
        .then(() => {
            canvas.style.display = "none";
            saveBtn.style.display = "none";
            reloadBtn.style.display = "none";
        })
}

function reloadWpn() {
    currentPlayer.money -= 60;
    currentPlayer.bullets = 6;
}