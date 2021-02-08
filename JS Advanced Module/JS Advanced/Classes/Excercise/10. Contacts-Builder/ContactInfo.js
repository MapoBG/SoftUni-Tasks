class Contact {
    constructor(firstName, lastName, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.element = this._initialize();
        this.online = false;
    }

    _initialize() {
        const articleEl = document.createElement("article");

        articleEl.innerHTML = `<div class="title">${this.firstName} ${this.lastName}<button>&#8505;</button></div>
        <div class="info">
            <span>&phone; ${this.phone}</span>
            <span>&#9993; ${this.email}</span>
        </div>`;

        articleEl.querySelector(".info").style.display = "none";
        articleEl.querySelector("button").addEventListener("click", this.showInfo);

        return articleEl;
    }

    set online(value) {
        if (value) {
            this.element.querySelector(".title").classList.add("online");
        } else {
            this.element.querySelector(".title").classList.remove("online");
        }

        return this._online = value;
    }

    render(elementId) {
        document.getElementById(elementId).appendChild(this.element);
    }

    showInfo(e) {
        const divInfoEl = e.target.parentElement.nextElementSibling;

        if (divInfoEl.style.display == "none") {
            divInfoEl.style.display = "block";
        } else {
            divInfoEl.style.display = "none";
        }
    }
}

let contacts = [
    new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
    new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
    new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com")
];
contacts.forEach(c => c.render('main'));

// After 1 second, change the online status to true
setTimeout(() => contacts[1].online = true, 2000);