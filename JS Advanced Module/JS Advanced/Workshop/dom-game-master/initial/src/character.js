Object.assign(window.game, (function () {
    const templates = {
        player: {
            name: "Pesho",
            img: "player.png",
            hp: 100,
            dmg: 25,
        },
        rat: {
            name: "Rat",
            level: 1,
            ai: true,
            img: "rat.png",
            hp: 25,
            dmg: 10,
        },
        skeleton: {
            name: "Skeleton",
            level: 2,
            ai: true,
            img: "skeleton.png",
            hp: 50,
            dmg: 15,
        },
        goblin: {
            name: "Goblin",
            level: 4,
            ai: true,
            img: "goblin.png",
            hp: 100,
            dmg: 25,
        },
    };

    return {
        createCharacter,
        templates,
    };

    function createCharacter(type) {
        const character = Object.assign({
            alive: true,
            name,
            armour: 0,
            attack,
            takeDmg
        }, templates[type]);
        character.maxHp = character.hp;

        const element = createCharacterCard(character);

        return { character, element };

        function attack(target) {
            target.takeDmg(character.dmg)
        }

        function takeDmg(incommingDmg) {
            character.hp -= incommingDmg;

            if (character.hp <= 0) {
                character.alive = false;
                character.hp = 0;
            }

            element.update();
        }
    }

    function createCharacterCard(character) {
        const stats = {
            hp: createElement("span", {}, `${character.hp}/${character.maxHp}`),
        };

        const element = createElement("article", { className: "character-card" },
            createElement("div", { className: "portrait" }, createElement("img", { src: "assets/" + character.img })),
            createElement("div", { className: "description" }, createElement("h3", {}, character.name)),
            createElement("ul", { className: "stats" },
                createElement("li", {}, "HP: ", stats.hp),
                createElement("li", {}, "Damage: ", createElement("span", {}, character.dmg)),
                createElement("li", {}, "Armour: ", createElement("span", {}, character.armour))
            ),
        );

        element.update = update;

        return element;

        function update() {
            stats.hp.textContent = `${character.hp}/${character.maxHp}`;
            if (character.alive == false) {
                element.classList.add("wasted");
            }
        }
    }
})());