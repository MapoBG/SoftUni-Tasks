function checkPassword(input) {
    let userName = input.shift();
    let isValid = false;
    let incorrectEntriesCount = 0;

    for (let i = 0; i < 4; i++) {
        let login = input[i].split("").reverse().join("")
        if (userName === login) {
            isValid = true;
            break;
        } else {
            incorrectEntriesCount++;
            if (incorrectEntriesCount < 4) {
                console.log("Incorrect password. Try again.");
            } else {
                break;
            }
        }
    }
    
    if (!isValid) {
        console.log(`User ${userName} blocked!`);
    } else {
        console.log(`User ${userName} logged in.`);
    }
}
checkPassword(['Acer', 'login', 'go', 'let me in', 'recA']);