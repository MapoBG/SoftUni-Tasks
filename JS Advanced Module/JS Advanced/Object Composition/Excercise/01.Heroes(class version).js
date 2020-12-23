function solve() {
    class Mage {
        constructor(name) {
            this.name = name;
            this.health = 100;
            this.mana = 100;
        }
        cast(spell) {
            this.mana--;
            console.log(`${this.name} cast ${spell}`);
        }
    }

    class Fighter {
        constructor(name) {
            this.name = name;
            this.health = 100;
            this.stamina = 100;
            this.fight = () => {
                this.stamina--;
                console.log(`${this.name} slashes at the foe!`);
            }
        }
    }
    return {
        mage: (name) => new Mage(name),
        fighter: (name) => new Fighter(name)
    }
}
let create = solve();
console.log(create);
const scorcher = create.mage('Scorcher');
scorcher.cast('fireball')
scorcher.cast('thunder')
scorcher.cast('light')
const warrior = create.fighter('Warrior');
warrior.fight()
console.log(warrior.stamina);
console.log(scorcher.mana);