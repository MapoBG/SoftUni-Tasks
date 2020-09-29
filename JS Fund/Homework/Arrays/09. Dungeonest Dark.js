function darkDungeon(input) {
    let health = 100;
    let coins = 0;
    let lines = input[0].split("|");
    let roomCounter = 0;

    for (let line of lines) {
        let [arg, value] = line.split(" ");
        value = Number(value);

        switch (arg) {
            case "potion":
                if (health + value <= 100) {
                    console.log(`You healed for ${value} hp.`);
                    health += value;
                    console.log(`Current health: ${health} hp.`);
                } else {
                    console.log(`You healed for ${100 - health} hp.`);
                    health = 100;
                    console.log(`Current health: ${health} hp.`);
                }
                roomCounter++;
                break;
            case "chest":
                console.log(`You found ${value} coins.`);
                coins += value;
                roomCounter++;
                break;
            default:
                roomCounter++;
                if (health - value > 0) {
                    console.log(`You slayed ${arg}.`);
                    health -= value;
                } else {
                    console.log(`You died! Killed by ${arg}.`);
                    return console.log(`Best room: ${roomCounter}`);
                }
                break;
        }
    }
    console.log(`You've made it!\nCoins: ${coins}\nHealth: ${health}`);
}
darkDungeon([ 'rat 10|bat 20|potion 10|rat 10|chest 100|boss 70|chest 1000' ])