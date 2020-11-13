class Parking {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
    }
    addCar(carModel, carNumber) {
        if (this.capacity == this.vehicles.length) {
            throw new Error("Not enough parking space.");
        }
        let newCar = { carModel, carNumber, payed: false };
        this.vehicles.push(newCar);
        return `The ${carModel}, with a registration number ${carNumber}, parked.`;
    }
    removeCar(carNumber) {
        let carToRemove = this.vehicles.find(car => car.carNumber == carNumber);
        if (!carToRemove) {
            throw new Error("The car, you're looking for, is not found.");
        }
        if (carToRemove.payed == false) {
            throw new Error(`${carNumber} needs to pay before leaving the parking lot.`);
        }

        let index = this.vehicles.indexOf(carToRemove);
        this.vehicles.splice(index, 1);
        return `${carNumber} left the parking lot.`;
    }

    pay(carNumber) {
        let carToRemove = this.vehicles.find(car => car.carNumber == carNumber);
        if (!carToRemove) {
            throw new Error(`${carNumber} is not in the parking lot.`);
        }
        if (carToRemove.payed == true) {
            throw new Error(`${carNumber}'s driver has already payed his ticket.`);
        }
        carToRemove.payed = true;
        return `${carNumber}'s driver successfully payed for his stay.`;
    }

    getStatistics(carNumber) {
        if (carNumber) {
            let car = this.vehicles.find(car => car.carNumber == carNumber);
            let carInfo = `${car.carModel} == ${car.carNumber} - ${car.payed == true ? "Has payed" : "Not payed"}`;
            return carInfo;
        } else {
            let result = `The Parking Lot has ${this.capacity - this.vehicles.length} empty spots left.`;
            this.vehicles.sort((a, b) => a.carModel.localeCompare(b.carModel))
                .forEach(car => {
                    result += `\n${car.carModel} == ${car.carNumber} - ${car.payed == true ? "Has payed" : "Not payed"}`;
                });
            return result;
        }
    }
}

const parking = new Parking(12);

console.log(parking.addCar("Volvo t600", "TX3691CA"));
console.log(parking.getStatistics());

console.log(parking.pay("TX3691CA"));
console.log(parking.removeCar("TX3691CA"));
