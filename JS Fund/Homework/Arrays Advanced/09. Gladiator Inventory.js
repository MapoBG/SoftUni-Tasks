function printInventory(params) {
    let equipment = params.shift().split(" ");

    params.forEach(line => {
        let [command, item] = line.split(" ");
        let index = equipment.indexOf(item);
        switch (command) {
            case "Buy":
                if (index < 0) {
                    equipment.push(item);
                }
                break;
            case "Trash":
                if (index >= 0) {
                    equipment.splice(index, 1);
                }
                break;
            case "Repair":
                if (index >= 0) {
                    equipment.splice(index, 1);
                    equipment.push(item);
                }
                break;
            case "Upgrade":
                let [basicItem, upgrade] = item.split('-');
                let ind = equipment.indexOf(basicItem);
                if (ind >= 0) {
                    let upgradedItem = `${basicItem}:${upgrade}`;
                    equipment.splice(ind + 1, 0, upgradedItem);
                }
                break;
        }
    });
    console.log(equipment.join(" "));
}
printInventory(['SWORD Shield Spear',
'Buy Bag',
'Trash Shield',
'Repair Spear',
'Upgrade SWORD-Steel']


)