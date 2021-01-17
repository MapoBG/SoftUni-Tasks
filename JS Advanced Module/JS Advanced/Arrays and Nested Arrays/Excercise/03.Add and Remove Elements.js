function addRemoveElements(input) {
    let initailNum = 1;
    let result = [];

    for (const command of input) {
        if (command == "add") {
            result.push(initailNum);
        } else if (command == "remove") {
            result.pop();
        }

        initailNum++;
    }

    if (result.length < 1) {
        console.log("Empty");
    } else {
        console.log(result.join("\n"));
    }
}
addRemoveElements(['remove', 
'remove', 
'remove']
)