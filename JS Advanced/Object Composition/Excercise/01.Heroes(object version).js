function solve() {
    
    function Mage(name) {
        this.name = name,
            this.health = 100,
            this.mana = 100,
            this.cast = (spell) => {
                this.mana--;
                console.log(`${this.name} cast ${spell}`)
            }
    };

    function Fighter(name) {
        this.name = name,
            this.health = 100,
            this.stamina = 100,
            this.fight = () => {
                this.stamina--;
                console.log(`${this.name} slashes at the foe!`);
            }
    };

    return {
        mage: (name) => new Mage(name),
        fighter: (name) => new Fighter(name)
    };
}
let create = solve();
// console.log(create);
const scorcher = create.mage('Scorcher');
scorcher.cast('fireball')
scorcher.cast('thunder')
scorcher.cast('light')
const scorcher2 = create.fighter('Scorcher 2');
scorcher2.fight()
console.log(scorcher2.stamina);
console.log(scorcher.mana);