function printHeroInfo(input) {
    let heroList = [];

    input.forEach(line => {
        let [hero, lvl, items] = line.split(" / ");
        lvl = Number(lvl);
        items = items.split(", ")
        .sort((a, b) => a.localeCompare(b))
        .join(", ");
        heroList.push({Hero: hero, level: lvl, items})
    });

    heroList.sort((a, b) => a.level - b.level)

    heroList.forEach(line => {
        
        console.log(`Hero: ${line.Hero}\nlevel => ${line.level}\nitems => ${line.items}`);
    });
}
printHeroInfo([
    "Isacc / 25 / Apple, GravityGun",
    "Derek / 12 / BarrelVest, DestructionSword",
    "Hes / 1 / Desolator, Sentinel, Antara"
    ]    
    )