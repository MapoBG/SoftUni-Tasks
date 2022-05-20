function tankBattle(tank1, tank2, ...commands) {
    tank1.shotsFired = 0;
    tank2.shotsFired = 0;

    const orders = {
        Reload(tank) {
            if (tank.gunReloaded) {
                console.log(`${tank.model} main gun already loaded and ready to fire!`);
            } else {
                tank.gunReloaded = true;
                console.log(`${tank.model} main gun successfully reloaded!`);
            }
            return false;
        },
        Fire(tankFiring, tankReceiving) {
            if (tankFiring.gunReloaded) {
                tankFiring.shotsFired += 1;
                tankFiring.gunReloaded = false;
                tankReceiving.HP = tankReceiving.HP - tankFiring.power;
                
                console.log(`${tankReceiving.model} was hit for ${tankFiring.power} HP!`);

                if (tankReceiving.HP <= 0) {
                    console.log(`${tankReceiving.model} is destroyed!\n${tankFiring.model} wins the tank duel!`);
                    return true;
                } else if (tankFiring.shotsFired >= 3) {
                    orders.Retreat(tankFiring, tankReceiving);
                    return true;
                } else {
                    return false;
                }

            } else {
                console.log(`${tankFiring.model} unable to fire. Main gun not reloaded!`);
                orders.Reload(tankFiring);
            }
        },
        Retreat(tankRetreating, tankStanding) {
            console.log(`${tankRetreating.model} crew is frightened by the ${tankStanding.model} and decides to retreat from the battle!`);
            return true;
        }
    }

    for (let command of commands) {
        let outcome;
        let [arg1, order] = command.split(" : ");

        if (arg1 === "Ceasefire!") {
            break;
        }

        if (tank1.model === arg1) {
            outcome = orders[order](tank1, tank2);
        } else {
            outcome = orders[order](tank2, tank1);
        }

        if (outcome) {
            return;
        }
    }

    console.log(`${tank1.model} and ${tank2.model} fought valiantly, and both survived the battle!`);
}

tankBattle(
    {
        model: "T-70",
        power: 10,
        HP: 100,
        gunReloaded: true
    },
    {
        model: "Pz V",
        power: 100,
        HP: 100,
        gunReloaded: false
    },
    "T-70 : Fire",
    "T-70 : Reload",
    "T-70 : Fire",
    "T-70 : Reload",
    "T-70 : Fire",
    "T-70 : Reload",
    "T-70 : Fire",
    "T-70 : Fire",
    "T-70 : Fire",
    "Ceasefire!"
)