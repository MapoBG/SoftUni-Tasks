class Movie {
    constructor(movieName, ticketPrice) {
        this.movieName = movieName;
        this.ticketPrice = Number(ticketPrice);
        this.screenings = [];
        this.profit = 0;
        this.soldTicketsTotal = 0;
    }
    newScreening(date, hall, description) {
        for (const screen of this.screenings) {
            if (screen.date == date && screen.hall == hall) {
                throw new Error(`Sorry, ${hall} hall is not available on ${date}`);
            }
        }
        this.screenings.push({ date, hall, description });
        return `New screening of ${this.movieName} is added.`;
    }

    endScreening(date, hall, soldTickets) {
        let isBusyDate = false;
        let isBusyHall = false;
        let screenIndex;
        for (const screen of this.screenings) {
            if (screen.date == date && screen.hall == hall) {
                isBusyDate = true;
                isBusyHall = true;
                screenIndex = this.screenings.indexOf(screen);
                break;
            }
        }

        if (!isBusyHall && !isBusyDate) {
            throw new Error(`Sorry, there is no such screening for ${this.movieName} movie.`);
        } else {
            this.soldTicketsTotal += soldTickets;
            let currentProfit = soldTickets * this.ticketPrice;
            this.profit += currentProfit;
            this.screenings.splice(screenIndex, 1);
            return `${this.movieName} movie screening on ${date} in ${hall} hall has ended. Screening profit: ${currentProfit}`;
        }
    }

    toString() {
        let result = `${this.movieName} full information:`;
        result += `\nTotal profit: ${this.profit.toFixed(0)}$\nSold Tickets: ${this.soldTicketsTotal}`;

        if (this.screenings.length > 0) {
            result += `\nRemaining film screenings:`;
            this.screenings.sort((scr1, scr2) => scr1.hall.localeCompare(scr2.hall))
                .forEach(scr => result += `\n${scr.hall} - ${scr.date} - ${scr.description}`);
        } else {
            result += `\nNo more screenings!`;
        }
        return result;
    }
};




let m = new Movie('Wonder Woman 1984', '10.00');
console.log(m.newScreening('October 2, 2020', 'IMAX 3D', `3D`));
console.log(m.newScreening('October 3, 2020', 'Main', `regular`));
console.log(m.newScreening('October 4, 2020', 'IMAX 3D', `3D`));
console.log(m.endScreening('October 2, 2020', 'IMAX 3D', 150));
console.log(m.endScreening('October 3, 2020', 'Main', 78));
console.log(m.toString());

m.newScreening('October 4, 2020', '235', `regular`);
m.newScreening('October 5, 2020', 'Main', `regular`);
m.newScreening('October 3, 2020', '235', `regular`);
m.newScreening('October 4, 2020', 'Main', `regular`);
console.log(m.toString());