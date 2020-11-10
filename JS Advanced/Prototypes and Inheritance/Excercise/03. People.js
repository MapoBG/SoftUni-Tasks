function solve() {

    class Employee {
        constructor(name, age) {
            if (new.target === Employee) {
                throw new Error("Can't instantiate directly.");
            }
            this.name = name;
            this.age = age;
            this.salary = 0;
            this.tasks = [];
            this.currentTask = 0;
        }

        work() {
            if (this.currentTask > this.tasks.length - 1) {
                this.currentTask = 0;
            }
            console.log(this.name + this.tasks[this.currentTask++]);
        }

        getSalary () {
            return this.salary;
        }

        collectSalary() {
            console.log(`${this.name} received ${this.getSalary()} this month.`);
        }
    }

    class Junior extends Employee {
        constructor(name, age, salary, currentTask) {
            super(name, age, salary, currentTask);
            this.tasks = [` is working on a simple task.`];
        }
    }

    class Senior extends Employee {
        constructor(name, age, salary, currentTask) {
            super(name, age, salary, currentTask);
            this.tasks = [` is working on a complicated task.`, ` is taking time off work.`, ` is supervising junior workers.`];
        }

    }

    class Manager extends Employee {
        constructor(name, age, salary, currentTask, dividend = 0) {
            super(name, age, salary, currentTask);
            this.dividend = dividend;
            this.tasks = [` scheduled a meeting.`, ` is preparing a quarterly report.`];
        }

        getSalary() {
            return this.dividend + this.salary;
        }
    }

    return { Employee, Junior, Senior, Manager };
}
result = solve();


let classes = solve();
let Employee = classes.Employee;
let Junior = classes.Junior;
let Senior = classes.Senior;
let Manager = classes.Manager;

let pesho = new Manager('Pesho', 25);
pesho.work();
pesho.work();
pesho.work();
pesho.work();
pesho.salary = 15000;
pesho.dividend = 5000;
pesho.collectSalary();