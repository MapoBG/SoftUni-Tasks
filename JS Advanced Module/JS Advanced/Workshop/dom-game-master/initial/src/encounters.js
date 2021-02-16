Object.assign(window.game, (function () {
    return {
        encounterController,
        generateEncounter,
    };

    function generateEncounter(difficulty) {
        let options = Object.entries(game.templates).filter(([k, v]) => v.ai == true);
        const selected = [];

        let encounterLevel = 0;

        while (encounterLevel < difficulty && options.length > 0) {
            let minLevel = Math.floor(difficulty / 3);
            let maxLevel = difficulty - encounterLevel;
            options = options.filter(([k, v]) => v.level <= maxLevel && v.level >= minLevel);

            if (options.length > 0) {
                const index = Math.floor(Math.random() * options.length);
                const current = options[index];
                selected.push(game.createCharacter(current[0]));
                encounterLevel += current[1].level;
            }
        }

        return selected;
    }

    function encounterController(enemySlot, player) {
        let characters = [];
        let initiative;

        enemySlot.addEventListener("click", selectTarget);

        return {
            enter,
            onPlayerAttack,
            onEnemyAttack,
            selectTarget,
        };

        function selectTarget({ target }) {
            while (target && target.classList && target.classList.contains("targettable") == false) {
                target = target.parentElement;
            }

            if (target && target.classList && target.classList.contains("targettable")) {
                const selected = characters.find(e => e.element == target);
                if (selected) {
                    characters[initiative].character.attack(selected.character);
                }

                disableTargetting();
                nextTurn();
            } else {
                disableTargetting();
            }
        }

        function onPlayerAttack() {
            enableTargetting(player);
        }

        function onEnemyAttack() {
            enableTargetting();
        }

        function enableTargetting(source) {
            characters
                .filter(c => c.character.alive && c != source)
                .forEach(c => c.element.classList.add("targettable"));
        }

        function disableTargetting() {
            characters.forEach(e => e.element.classList.remove("targettable"));
        }

        function enter(enemies) {
            enemySlot.innerHTML = "";
            enemies.forEach(e => enemySlot.appendChild(e.element));
            characters = [player, ...enemies];
            initiative = -1;
            nextTurn();
        }

        function nextTurn() {
            if (player.character.alive == false) {
                game.events.onEncounterEnd(false);
            } else if (characters.filter(c => c.character.alive).length == 1) {
                game.events.onEncounterEnd(true);
            }

            do {
                initiative = (initiative + 1) % characters.length;
            } while (characters[initiative].character.alive == false);

            characters.forEach(c => c.element.classList.remove("active"));
            characters[initiative].element.classList.add("active");
            game.events.onBeginTurn(characters[initiative]);
        }
    }
})());