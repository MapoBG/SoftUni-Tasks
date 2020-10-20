function checkInvites(input) {
    let guests = {
        VIP: [],
        regular: [],
    };

    input.forEach(guest => {
        if(guest !== "PARTY"){
            if (!isNaN(Number(guest[0]))) {
                if(guests.VIP.includes(guest)){
                    guests.VIP = guests.VIP.filter(e => e != guest);
                } else {
                    guests.VIP.push(guest);
                }
            } else {
                if(guests.regular.includes(guest)){
                    guests.regular = guests.regular.filter(e => e != guest);
                } else {
                    guests.regular.push(guest);
                }
            }
        }
    });

    let count = guests.VIP.length + guests.regular.length;

    console.log(`${count}\n${guests.VIP.join("\n")}\n${guests.regular.join("\n")}`);
}
checkInvites(['7IK9Yo0h',
    '9NoBUajQ',
    'Ce8vwPmE',
    'SVQXQCbc',
    'tSzE5t0p',
    'PARTY',
    '9NoBUajQ',
    'Ce8vwPmE',
    'SVQXQCbc'
]
)
