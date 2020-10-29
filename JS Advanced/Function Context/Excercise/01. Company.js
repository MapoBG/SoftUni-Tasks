class Company {
    constructor(departments) {
        this.departments = [];
    }
    
    addEmployee(username, salary, position, department) {
        if (salary < 0) {
            throw new Error(" Invalid input!");
        } else if (!(salary && username && position && department)) {
            throw new Error("Invalid input!");
        } else {
            let employeeInfo = { username, salary, position, department };
            this.departments.push(employeeInfo);
            return `New employee is hired. Name: ${username}. Position: ${position}`;
        }
    }

    bestDepartment() {
        let departmentsList = {};
        this.departments.forEach(employee => {
            let dpt = [employee.department];
            if (!departmentsList[dpt]) {
                departmentsList[dpt] = [];
                departmentsList[dpt].totalSalaries = 0;
                departmentsList[dpt].avgSalary = 0;

            }
            departmentsList[dpt].push({ username: employee.username, position: employee.position, salary: employee.salary });
            departmentsList[dpt].totalSalaries += employee.salary;
            departmentsList[dpt].avgSalary = departmentsList[dpt].totalSalaries / departmentsList[dpt].length;
        })
        let sortedDpts = Object.keys(departmentsList)
            .sort((d1, d2) => departmentsList[d2].avgSalary - departmentsList[d1].avgSalary)
            .shift();

        let bestDpt = departmentsList[sortedDpts].slice(0);
        let sortedEmployees = [];
        bestDpt.sort((e1, e2) => e2.salary - e1.salary || e1.username.localeCompare(e2.username))
            .forEach(e => {
                sortedEmployees.push(`${e.username} ${e.salary} ${e.position}`);
            })
        return (`Best Department is: ${sortedDpts}\nAverage salary: ${(departmentsList[sortedDpts].avgSalary).toFixed(2)}\n${sortedEmployees.join("\n")}`);
    }
}

let c = new Company();
let actual1 = c.addEmployee("Stanimir", 2000, "engineer", "Human resources");
let expected1 = "New employee is hired. Name: Stanimir. Position: engineer";

c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");

let act = c.bestDepartment();
let exp = "Best Department is: Human resources\nAverage salary: 1675.00\nStanimir 2000 engineer\nGosho 1350 HR";

