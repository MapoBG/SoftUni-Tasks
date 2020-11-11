class VeterinaryClinic {
    constructor(clinicName, capacity) {
        this.clinicName = clinicName;
        this.capacity = capacity;
        this.clients = [];
        this.currentWorkload = 0;
        this.totalProfit = 0;
    }
    newCustomer(ownerName, petName, kind, procedures) {
        if (this.currentWorkload == this.capacity) {
            throw new Error("Sorry, we are not able to accept more patients!");
        }

        let test = '';
        for (let client of this.clients) {
            if (client[ownerName]) {
                test = client[ownerName];
                if (client[ownerName][petName]) {
                    if (client[ownerName][petName].procedures.length > 0) {
                        throw new Error(`This pet is already registered under ${ownerName} name! ${petName} is on our lists, waiting for ${client[ownerName][petName].procedures.join(", ")}.`);
                    } else {
                        client[ownerName][petName].procedures = procedures;
                    }
                } else {
                    client[ownerName][petName] = { kind, procedures };
                    break;
                }
            }
        }
        if (!test) {
            this.clients.push({ [ownerName]: { [petName]: { kind, procedures } } });
        }

        this.currentWorkload++;
        return `Welcome ${petName}!`
    }
    onLeaving(ownerName, petName) {
        for (const owner of this.clients) {
            if (owner[ownerName]) {
                if (owner[ownerName][petName]) {
                    let proceduresCount = owner[ownerName][petName].procedures.length;
                    if (proceduresCount > 0) {
                        this.totalProfit += 500 * proceduresCount;
                        this.currentWorkload--;
                        owner[ownerName][petName].procedures = [];
                        return `Goodbye ${petName}. Stay safe!`
                    } else {
                        throw new Error(`Sorry, there are no procedures for ${petName}!`)
                    }
                } else {
                    throw new Error(`Sorry, there are no procedures for ${petName}!`)
                }
            } else {
                throw new Error("Sorry, there is no such client!");
            }
        }
    }
    toString() {
        let busyPercentage = Math.trunc((this.currentWorkload / this.capacity) * 100);
        this.clients = this.clients.sort(sortOwners);
        let result = '';
        this.clients.forEach(client => {
            let owner = Object.keys(client)[0];
            result += `\n${owner} with:`
            Object.keys(client[owner]).sort((pet1, pet2) => pet1.localeCompare(pet2))
                .forEach(pet => {
                    result += `\n---${pet} - a ${client[owner][pet].kind.toLowerCase()} that needs: ${client[owner][pet].procedures.join(", ")}`
                })
        })
        let endResult = `${this.clinicName} is ${busyPercentage}% busy today!\nTotal profit: ${this.totalProfit.toFixed(2)}$` + result;
        return endResult;

        function sortOwners(owner1Obj, owner2Obj) {
            let name1 = Object.keys(owner1Obj)[0]
            let name2 = Object.keys(owner2Obj)[0]
            if (name1 > name2) {
                return 1;
            } else if (name1 < name2) {
                return -1;
            }
            return 0;
        }
    }
}

let clinic = new VeterinaryClinic('SoftCare', 10);
console.log(clinic.newCustomer('Jim Jones', 'Tom', 'Cat', ['A154B', '2C32B', '12CDB']));
console.log(clinic.newCustomer('Anna Morgan', 'Max', 'Dog', ['SK456', 'DFG45', 'KS456']));
console.log(clinic.newCustomer('Jim Jones', 'Tiny', 'Cat', ['A154B']));
console.log(clinic.onLeaving('Jim Jones', 'Tiny'));
console.log(clinic.toString());
clinic.newCustomer('Jim Jones', 'Sara', 'Dog', ['A154B']);
console.log(clinic.toString());