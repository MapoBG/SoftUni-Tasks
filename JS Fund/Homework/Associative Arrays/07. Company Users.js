function printUsers(input) {
    let userList = {};

    input.forEach(line => {
        let [company, user] = line.split(" -> ");
        if (!userList[company]) {
            userList[company] = [];
        }
        if (!userList[company].includes(`-- ${user}`)) {
            userList[company].push(`-- ${user}`);
        }
    });

    Object.keys(userList)
        .sort((a, b) => a.localeCompare(b))
        .forEach(company => console.log(`${company}\n${userList[company].join("\n")}`));
}
printUsers([
    'SoftUni -> AA12345',
    'SoftUni -> CC12344',
    'Lenovo -> XX23456',
    'SoftUni -> AA12345',
    'Movement -> DD11111'
]
);