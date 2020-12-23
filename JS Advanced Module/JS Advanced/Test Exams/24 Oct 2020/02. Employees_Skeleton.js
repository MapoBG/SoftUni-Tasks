function solveClasses() {
    class Developer {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.baseSalary = 1000;
            this.tasks = [];
            this.experience = 0;
        }

        addTask(id, taskName, priority) {
            let curTask = { id, taskName, priority };
            if (priority == "high") {
                this.tasks.unshift(curTask);
            } else {
                this.tasks.push(curTask);
            }
            return `Task id ${id}, with ${priority} priority, has been added.`;
        }

        doTask() {
            let newestTask = this.tasks.find(task => task.priority == 'high');
            if (this.tasks.length == 0) {
                return `${this.firstName}, you have finished all your tasks. You can rest now.`
            }

            if (newestTask) {
                this.tasks.shift();
            } else {
                this.tasks.pop();
            }
        }

        getSalary() {
            return `${this.firstName} ${this.lastName} has a salary of: ${this.baseSalary}`;
        }

        reviewTasks() {
            let result = [];
            this.tasks.forEach(task => {
                result.push(`${task.id}: ${task.taskName} - ${task.priority}`)
            });
            return `Tasks, that need to be completed:\n` + result.join("\n");
        }
    }

    class Junior extends Developer {
        constructor(firstName, lastName, bonus, experience, baseSalary, tasks) {
            super(firstName, lastName, baseSalary, tasks);
            this.baseSalary += bonus;
            this.experience = experience
        }
        learn(years) {
            this.experience += years;
        }
    }

    class Senior extends Developer {
        constructor(firstName, lastName, bonus, experience, baseSalary, tasks) {
            super(firstName, lastName, baseSalary, tasks);
            this.baseSalary += bonus;
            this.experience = experience + 5;
        }
        changeTaskPriority(taskId) {
            let taskToChange = this.tasks.find(task => task.id == taskId);
            if (taskToChange.priority == "low") {
                taskToChange.priority = "high";
            } else {
                taskToChange.priority = "low";
            }
            let index = this.tasks.indexOf(taskToChange);
            this.tasks.splice(index, 1);
            this.tasks.splice(0, 0, taskToChange);
            return taskToChange;
        }
    }
    return {
        Developer,
        Junior,
        Senior
    }
}

let classes = solveClasses();
const developer = new classes.Developer("George", "Joestar");
console.log(developer.addTask(1, "Inspect bug", "low"));
console.log(developer.addTask(2, "Update repository", "high"));
console.log(developer.reviewTasks());
console.log(developer.getSalary());

const junior = new classes.Junior("Jonathan", "Joestar", 200, 2);
console.log(junior.getSalary());

const senior = new classes.Senior("Joseph", "Joestar", 200, 2);
senior.addTask(1, "Create functionality", "low");
senior.addTask(2, "Update functionality", "high");
console.log(senior.changeTaskPriority(1)["priority"]);
