function solve(input) {
    let result = input.map(row => {
        let [name, level, items] = row.split(" / ");
        
        if (!items) {
            items = [];
        } else {
            items = items.split(", ");
        }

        level = Number(level);

        return {
            name,
            level,
            items,
        }
    });

    return JSON.stringify(result);
}

solve(['Isacc / 25',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara']);