class Parking {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
    }

    addCar(carModel, carNumber) {
        if (this.capacity > 0) {
            this.vehicles.push({ carModel, carNumber, payed: false });
            this.capacity--;
            return `The ${carModel}, with a registration number ${carNumber}, parked.`;
        }

        throw new Error("Not enough parking space.");
    }

    removeCar(carNumber) {
        let car = this.vehicles.find(car => car.carNumber == carNumber);

        if (!car) {
            throw new Error("The car, you're looking for, is not found.");
        }

        if (!car.payed) {
            throw new Error(`${carNumber} needs to pay before leaving the parking lot.`);
        }

        this.vehicles.splice(this.vehicles.indexOf(car), 1);
        this.capacity++;

        return `${carNumber} left the parking lot.`;
    }

    pay(carNumber) {
        let car = this.vehicles.find(car => car.carNumber == carNumber);

        if (!car) {
            throw new Error(`${carNumber} is not in the parking lot.`);
        }

        if (car.payed) {
            throw new Error(`${carNumber}'s driver has already payed his ticket.`);
        }

        car.payed = true;

        return `${carNumber}'s driver successfully payed for his stay.`;
    }

    getStatistics(carNumber) {
        if (carNumber) {
            let car = this.vehicles.find(car => car.carNumber == carNumber);

            const hasPayed = car.payed ? "Has payed" : "Not payed";

            return `${car.carModel} == ${car.carNumber} - ${hasPayed}`;
        }

        let info = `The Parking Lot has ${this.capacity} empty spots left.\n`;

        this.vehicles
            .sort((car1, car2) => car1.carModel.localeCompare(car2.carModel))
            .forEach(car => {
                const hasPayed = car.payed ? "Has payed" : "Not payed";

                info += `${car.carModel} == ${car.carNumber} - ${hasPayed}\n`;
            });

        return info.trim();
    }
}

const parking = new Parking(12);

console.log(parking.addCar("Volvo t600", "TX3691CA"));
console.log(parking.getStatistics());

console.log(parking.pay("TX3691CA"));
console.log(parking.removeCar("TX3691CA"));
