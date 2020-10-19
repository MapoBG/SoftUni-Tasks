function employeeList(employees) {
    let listOfEmployees = {};

    employees.forEach(e => {
        if(!listOfEmployees[e]){
            listOfEmployees[e] = e.length;
        }
    });

    Object.keys(listOfEmployees).forEach(name => {
        console.log(`Name: ${name} -- Personal Number: ${listOfEmployees[name]}`);
    })
}
employeeList([
    'Silas Butler',
    'Adnaan Buckley',
    'Juan Peterson',
    'Brendan Villarreal'
    ]
    )