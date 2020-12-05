fetch("https://students-c50f9-default-rtdb.firebaseio.com/.json")
    .then(res => res.json())
    .then(students => showStudents(students))

function showStudents(dataObj) {
    let tableEl = document.querySelector("table tbody");

    Object
        .values(dataObj)
        .sort((stud1, stud2) => stud1.ID - stud2.ID)
        .forEach(student => {
            let template = Handlebars.compile(document.getElementById("student-template").innerHTML);

            tableEl.innerHTML += template(student);
        });
}