function calculateExpemses(lostFights, helmetPrice, swordPrice, shieldPrice, armorPrice) {
    let brokenHelms = Math.trunc(lostFights / 2);
    let brokenSwords = Math.trunc(lostFights / 3);
    let brokenShields = Math.trunc(lostFights / 6);
    let brokenArmors = Math.trunc(lostFights / 12);

    let expenses = (brokenArmors * armorPrice + brokenHelms * helmetPrice + brokenShields * shieldPrice + brokenSwords * swordPrice).toFixed(2);

    console.log(`Gladiator expenses: ${expenses} aureus`);
}
calculateExpemses(7,
    2,
    3,
    4,
    5
);