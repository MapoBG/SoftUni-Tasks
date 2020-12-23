function solveClasses() {
    class Hall {
        constructor(capacity, name) {
            this.capacity = capacity;
            this.name = name;
            this.events = [];
        }
        hallEvent(title) {
            let event = this.events.find(e => e == title);
            if (event) {
                throw new Error(`This event is already added!`);
            } else {
                this.events.push(title);
                return "Event is added.";
            }
        }
        close() {
            this.events = [];
            return `${this.name} hall is closed.`;
        }
        toString() {
            let result = `${this.name} hall - ${this.capacity}`;
            if (this.events.length > 0) {
                result += `\nEvents: ${this.events.join(', ')}`;
            }
            return result;
        }
    }

    class MovieTheater extends Hall {
        constructor(capacity, name, screenSize, events) {
            super(capacity, name, events);
            this.screenSize = screenSize;
        }
        close() {
            return super.close() + "Аll screenings are over.";
        }
        toString() {
            let result = super.toString() + `\n${this.name} is a movie theater with ${this.screenSize} screensize and ${this.capacity} seats capacity.`;
            return result;
        }
    }

    class ConcertHall extends Hall {
        constructor(capacity, name, events) {
            super(capacity, name, events);
        }
        hallEvent(title, performers) {
            let event = this.events.find(e => e.title == title);
            if (event) {
                throw new Error(`This event is already added!`);
            } else {
                this.events.push({ title, performers });
                return "Event is added.";
            }
        }

        close() {
            return super.close() + "Аll performances are over.";
        }

        toString() {
            let result = super.toString().split("\n")[0];
            if (this.events.length > 0) {
                let events = [];
                let performers = [];
                this.events.forEach(event => {
                    let title = Object.values(event)[0];
                    let performer = Object.values(event)[1];
                    events.push(title);
                    performers.push(performer.join(", "))
                })
                result += `\nEvents: ${events.join(', ')}`;
                result += `\nPerformers: ${performers.join(', ')}.`;
            }
            return result;
        }
    }

    return {
        Hall,
        MovieTheater,
        ConcertHall
    }
}

let classes = solveClasses();
let hall = new classes.Hall(20, 'Main');
console.log(hall.hallEvent('Breakfast Ideas'));
console.log(hall.hallEvent('Annual Charity Ball'));
console.log(hall.toString());
console.log(hall.close());

let movieHall = new classes.MovieTheater(10, 'Europe', '10m');
console.log(movieHall.hallEvent('Top Gun: Maverick'));
console.log(movieHall.toString());

let concert = new classes.ConcertHall(5000, 'Diamond');
console.log(concert.hallEvent('The Chromatica Ball', ['LADY GAGA']));
console.log(concert.toString());
console.log(concert.close());
console.log(concert.toString());
