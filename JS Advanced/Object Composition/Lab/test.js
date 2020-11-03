let person = {

    name: 'Gosho',

    employees: {
        name: 'Pesho',
        surName: 'Svinqta',
        age: 11,
        test: function () {

          let  test2 = () => {return `My name is ${this.name} ${this.surName} and I'm ${this.age} years old.`;}
            return `My name is ${this.name} ${this.surName} and I'm ${this.age} years old.\n` +  test2();
        }
    },



}

console.log(person.employees.test());