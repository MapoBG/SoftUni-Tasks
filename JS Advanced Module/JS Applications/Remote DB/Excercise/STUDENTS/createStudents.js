class Student {
    constructor(ID, FirstName, LastName, FacultyNumber, Grade) {
        this.ID = ID;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.FacultyNumber = FacultyNumber;
        this.Grade = Grade;
    }
}

let ivan = new Student(5, "Ivan", "Ivanov", "999999999999", 4.59);
let dragan = new Student(10, "Dragan", "Ivanov", "777777777777", 3.59);

fetch("https://students-c50f9-default-rtdb.firebaseio.com/.json", {
    method: "POST",
    body: JSON.stringify(dragan)
})
