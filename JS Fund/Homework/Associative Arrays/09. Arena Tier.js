function printGladiators(input) {
    let gladiatorsList = {};
    let line = input.shift();

    while (line != 'Ave Cesar') {
        let [gladiator, technique, skill] = line.split(' -> ');
        if (technique) {
            if (!gladiatorsList[gladiator]) {
                gladiatorsList[gladiator] = {};
            }
            if (!gladiatorsList[gladiator][technique]) {
                gladiatorsList[gladiator][technique] = Number(skill);
            } else {
                gladiatorsList[gladiator][technique] = Math.max(skill, gladiatorsList[gladiator][technique]);
            }
        } else {
            let [gladiator1, vs, gladiator2] = gladiator.split(" ");
            if (gladiatorsList[gladiator1] && gladiatorsList[gladiator2]) {
                let g1Skills = Object.keys(gladiatorsList[gladiator1]);
                let g2Skills = Object.keys(gladiatorsList[gladiator2]);
                for (const skill of g1Skills) {
                    if (g2Skills.includes(skill)) {
                        if (gladiatorsList[gladiator1][skill] > gladiatorsList[gladiator2][skill]) {
                            delete gladiatorsList[gladiator2];
                            break;
                        } else if (gladiatorsList[gladiator1][skill] < gladiatorsList[gladiator2][skill]) {
                            delete gladiatorsList[gladiator1];
                            break;
                        }
                    }
                }
            }
        }
        line = input.shift();
    }

    for (const gladiator in gladiatorsList) {
        gladiatorsList[gladiator].totalSkillPoints = 0
        Object.keys(gladiatorsList[gladiator]).forEach(skill => {
            if (skill != 'totalSkillPoints') {
                gladiatorsList[gladiator].totalSkillPoints += gladiatorsList[gladiator][skill]
            }
        })
    }

    Object.keys(gladiatorsList)
        .sort((a, b) => gladiatorsList[b].totalSkillPoints - gladiatorsList[a].totalSkillPoints || a.localeCompare(b))
        .forEach(name => {
            let skillsList = [];
            let skillPoints = gladiatorsList[name].totalSkillPoints;
            delete gladiatorsList[name].totalSkillPoints;
            Object.keys(gladiatorsList[name])
                .sort((skill1, skill2) => gladiatorsList[name][skill2] - gladiatorsList[name][skill1] || skill1.localeCompare(skill2))
                .forEach(skill => {
                    skillsList.push(`- ${skill} <!> ${gladiatorsList[name][skill]}`)
                });
            console.log(`${name}: ${skillPoints} skill\n${skillsList.join("\n")}`);
        });
}
printGladiators([
    'Peter -> BattleCry -> 400',
    'Alex -> PowerPunch -> 300',
    'Stefan -> Duck -> 200',
    'Stefan -> Tiger -> 250',
    'Ave Cesar']);