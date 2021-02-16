Object.assign(window.game, (function () {
    const playerSlot = document.getElementById("player");
    const enemySlot = document.getElementById("enemies");

    const player = game.createCharacter("player");

    const encounterController = game.encounterController(enemySlot, player);
    const controls = createElement("div", { id: "controls" }, createElement("button", { onClick: encounterController.onPlayerAttack }, "Attack"));
    disableControlls();

    playerSlot.appendChild(player.element);
    playerSlot.appendChild(controls);

    game.events.onBeginTurn.subscribe(onBeginTurn);
    game.events.onEncounterEnd.subscribe(onEncounterEnd);

    let difficulty = 1;

    //Begin encounter as player
    encounterController.enter(game.generateEncounter(difficulty));

    function onBeginTurn(controller) {
        if (controller.character.ai) {
            disableControlls();
            setTimeout(() => {
                encounterController.onEnemyAttack();
                encounterController.selectTarget({ target: player.element });
            }, 500)
        } else {
            enableControlls();
        }
    }

    function enableControlls() {
        [...controls.children].forEach(c => c.disabled = false);
    }

    function disableControlls() {
        [...controls.children].forEach(c => c.disabled = true);
    }

    function onEncounterEnd(victory) {
        if (victory) {
            alert("Enemies defeated!");
            difficulty++;
            encounterController.enter(game.generateEncounter(difficulty));
            disableControlls();
        } else {
            alert("You died!");
            disableControlls();
        }
    }
})());