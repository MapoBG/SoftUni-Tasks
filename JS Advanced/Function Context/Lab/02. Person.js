class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    get fullName () {
        return this.firstName + " " + this.lastName;
    }

    set fullName(name) {
        name = name.split(" ");
        if(name.length == 2){
            [this.firstName, this.lastName] = name;
        } else {
            throw new Error("Incorrect full name!");
        }
    }
}

let person = new Person("Albert", "Simpson");
console.log(person.fullName);//Albert Simpson
person.firstName = "Simon";
console.log(person.fullName);//Simon Simpson
person.fullName = "Peter";
console.log(person.firstName) // Simon
console.log(person.lastName) // Simpson

