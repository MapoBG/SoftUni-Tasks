function solve(input) {
    let friendsList = input.shift().split(", ");
    let currentEl = input.shift();

    while (currentEl != 'Report') {
        let [command, arg1, arg2] = currentEl.split(" ");
        switch (command) {
            case 'Blacklist':
                blackListPerson(arg1);
                break;
            case 'Error':
                arg1 = Number(arg1);
                lostPerson(arg1);
                break;
            case 'Change':
                changePerson(arg1, arg2);
                break;
        }

        currentEl = input.shift();
    }
    let blacklisted = friendsList.filter(name => name == 'Blacklisted').length;
    let lost = friendsList.filter(name => name == 'Lost').length;

    console.log(`Blacklisted names: ${blacklisted}\nLost names: ${lost}\n${friendsList.join(" ")}`);

    function blackListPerson(name) {
        let nameIndex = friendsList.indexOf(name);
        if (nameIndex >= 0) {
            friendsList[nameIndex] = 'Blacklisted';
            console.log(`${name} was blacklisted.`);
        } else {
            console.log(`${name} was not found.`);
        }
    }

    function lostPerson(index) {
        let name = friendsList[index];
        if(name != 'Blacklisted' && name != 'Lost'){
            console.log(`${name} was lost due to an error.`);
            friendsList[index] = 'Lost';
        }
    }

    function changePerson(index, newName) {
        //.length might crash in Judge
        if(index >= 0 && index < friendsList.length){
            console.log(`${friendsList[index]} changed his username to ${newName}.`);
            friendsList[index] = newName;
        }        
    }
}
solve(["Mike, John, Eddie, William",
"Error 3",
"Error 3",
"Change 0 Mike123",
"Blacklist Eddie",
"Report"])
