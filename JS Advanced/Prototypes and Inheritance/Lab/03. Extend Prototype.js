function extendClass(classToExtend) {
    classToExtend.prototype.species = 'Human';
    classToExtend.prototype.toSpeciesString = function () {
        return `I am a ${this.species}. ${this.toString()}`;
    }
}



class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    toString() {
        let className = this.constructor.name;
        return `${className} (name: ${this.name}, email: ${this.email})`;
    }
}

class Teacher extends Person {
    constructor(name, email, subject) {
        super(name, email);
        this.subject = subject;
    }
    toString() {
        let baseStr = super.toString().slice(0, -1);
        return baseStr + `, subject: ${this.subject})`;
    }
}

extendClass(Person);
let t = new Teacher("Posho","imail@hit.bg","Coding");
console.log(t.species == 'Human',"No species property")
console.log(t.toSpeciesString() == "I am a Human. Teacher (name: Posho, email: imail@hit.bg, subject: Coding)");