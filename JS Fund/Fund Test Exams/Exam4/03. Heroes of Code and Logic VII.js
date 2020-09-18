function printAliveMembers(input) {
    let numberOfHeroes = input.shift();
    let heroes = {};

    for (let i = 0; i < numberOfHeroes; i++) {
        let line = input.shift();
        let [heroName, hp, mp] = line.split(" ");

        if (!heroes[heroName]) {
            heroes[heroName] = {
                health: 0,
                mana: 0,
            }
        }
        heroes[heroName].health += Number(hp);
        heroes[heroName].mana += Number(mp);
    }

    let line = input.shift();

    while (line !== "End") {
        let [command, heroName, ...rest] = line.split(" - ");
        if (heroes[heroName]) {
            switch (command) {
                case "CastSpell":
                    let [manaCost, spellName] = [...rest];
                    manaCost = Number(manaCost);
                    if (heroes[heroName].mana >= manaCost) {
                        heroes[heroName].mana -= manaCost;
                        console.log(`${heroName} has successfully cast ${spellName} and now has ${heroes[heroName].mana} MP!`);
                    } else {
                        console.log(`${heroName} does not have enough MP to cast ${spellName}!`);
                    }
                    break;
                case "TakeDamage":
                    let [damage, attacker] = [...rest];
                    damage = Number(damage);
                    heroes[heroName].health -= damage;
                    if (heroes[heroName].health > 0) {
                        console.log(`${heroName} was hit for ${damage} HP by ${attacker} and now has ${heroes[heroName].health} HP left!`);
                    } else {
                        console.log(`${heroName} has been killed by ${attacker}!`);
                        delete heroes[heroName];
                    }
                    break;
                case "Recharge":
                    let manaAmount = Number(rest);
                    let currentMana = heroes[heroName].mana;
                    heroes[heroName].mana += manaAmount;
                    if (heroes[heroName].mana > 200) {
                        heroes[heroName].mana = 200;
                        console.log(`${heroName} recharged for ${200 - currentMana} MP!`);
                    } else {
                        console.log(`${heroName} recharged for ${manaAmount} MP!`);
                    }
                    break;
                case "Heal":
                    let healthAmount = Number(rest);
                    let currentHealth = heroes[heroName].health;
                    heroes[heroName].health += healthAmount;
                    if (heroes[heroName].health > 100) {
                        heroes[heroName].health = 100;
                        console.log(`${heroName} healed for ${100 - currentHealth} HP!`);
                    } else {
                        console.log(`${heroName} healed for ${healthAmount} HP!`);
                    }
                    break;
            }
        }

        line = input.shift();
    }

    let sortedHeroes = Object.keys(heroes)
        .sort((a, b) => heroes[b].health - heroes[a].health || a.localeCompare(b));

    for (let hero of sortedHeroes) {
        console.log(`${hero}\n  HP: ${heroes[hero].health}\n  MP: ${heroes[hero].mana}`);
    }
}
printAliveMembers([
    '2',
    'Solmyr 85 120',
    'Kyrre 99 50',
    'Heal - Solmyr - 10',
    'Recharge - Solmyr - 50',
    'TakeDamage - Kyrre - 66 - Orc',
    'CastSpell - Kyrre - 15 - ViewEarth',
    'End'
])