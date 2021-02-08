function solve(input) {
    const juices = {};
    const juiceBottles = new Map;

    input.forEach(line => {
        let [juice, qty] = line.split(" => ");

        if (!juices[juice]) {
            juices[juice] = 0;
        }

        juices[juice] += Number(qty);

        if (juices[juice] >= 1000) {
            const bottles = Math.trunc(juices[juice] / 1000);

            juices[juice] -= bottles * 1000;

            if (!juiceBottles.has(juice)) {
                juiceBottles.set(juice, 0);
            }

            juiceBottles.set(juice, juiceBottles.get(juice) + bottles);
        }
    });

    juiceBottles.forEach((bottles, juice) => {
        console.log(`${juice} => ${bottles}`);
    });
}

solve(['Kiwi => 234',
'Pear => 2345',
'Watermelon => 3456',
'Kiwi => 4567',
'Pear => 5678',
'Watermelon => 6789']
);