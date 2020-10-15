function printGuests(params) {
    let guestList = [];

    for (let line of params) {
        let [name, ...invited] = line.split(" ");
        invited = invited.join(" ");
        if (invited == "is going!") {
            if (!guestList.includes(name)) {
                guestList.push(name);
            } else {
                console.log(`${name} is already in the list!`);
            }
        } else if (invited == "is not going!") {
            if (guestList.includes(name)) {
                guestList = guestList.filter(n => n != name);
            } else {
                console.log(`${name} is not in the list!`);
            }
        }
    }
    console.log(guestList.join('\n'));
}
printGuests(['Allie is going!',
    'George is going!',
    'John is going!',
    'George is not going!']
)