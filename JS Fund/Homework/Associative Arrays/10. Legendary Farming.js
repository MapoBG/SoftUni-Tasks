function printSortedItems(input) {
    let inputLine = input.split(" ");
    let materialsList = {
        essentialMts: {
            fragments: 0,
            shards: 0,
            motes: 0.
        },
        junk: {},
    }

    for (let i = 0; i < inputLine.length; i += 2) {
        let qty = Number(inputLine[i]);
        let material = inputLine[i + 1];
        material = material.toLowerCase();
        checkMaterials(material, qty);
        if (materialsList.essentialMts[material] >= 250) {
            console.log(`${checkLegendaryItem(material)} obtained!`);
            break;
        }
    }
    Object.keys(materialsList.essentialMts)
        .sort((el1, el2) => materialsList.essentialMts[el2] - materialsList.essentialMts[el1] || el1.localeCompare(el2))
        .forEach(element => console.log(`${element}: ${materialsList.essentialMts[element]}`))
    Object.keys(materialsList.junk)
        .sort((j1, j2) => j1.localeCompare(j2))
        .forEach(junk => console.log(`${junk}: ${materialsList.junk[junk]}`))

    function checkMaterials(mat, qty) {
        switch (mat) {
            case 'fragments':
            case 'shards':
            case 'motes':
                    materialsList.essentialMts[mat] += qty;
                break;
            default:
                if (!materialsList.junk[mat]) {
                    materialsList.junk[mat] = qty;
                } else {
                    materialsList.junk[mat] += qty;
                }
                break;
        }
    }

    function checkLegendaryItem(item) {
        let legItem = "";
        switch (item) {
            case 'shards':
                legItem = 'Shadowmourne';
                break;
            case 'fragments':
                legItem = 'Valanyr';
                break;
            case 'motes':
                legItem = 'Dragonwrath';
                break;
        }
        materialsList.essentialMts[item] -= 250;
        return legItem;
    }
}
printSortedItems('3 Motes 5 stones 5 Shards 6 leathers 255 fragments 7 Shards')