class Bank {
    #bankName
    constructor(bankName) {
        this.#bankName = bankName;
        this.allCustomers = [];
    }
    newCustomer(customer) {
        this.allCustomers.forEach(c => {
            if (c.firstName == customer.firstName && c.lastName == customer.lastName && c.personalId == customer.personalId) {
                throw new Error(`${customer.firstName} ${customer.lastName} is already our customer!`);
            }
        });
        let newCustomer = { firstName: customer.firstName, lastName: customer.lastName, personalId: customer.personalId, totalMoney: 0, transactions: [] };
        this.allCustomers.push(newCustomer);

        return newCustomer;
    }
    depositMoney(personalId, amount) {
        let customer = this.findCustomer(personalId);

        customer.totalMoney += amount;
        customer.transactions.unshift(`${customer.firstName} ${customer.lastName} made deposit of ${amount}$!`);

        return `${customer.totalMoney}$`;
    }
    withdrawMoney(personalId, amount) {
        let customer = this.findCustomer(personalId);

        if (customer.totalMoney < amount) {
            throw new Error(`${customer.firstName} ${customer.lastName} does not have enough money to withdraw that amount!`);
        }
        customer.totalMoney -= amount;
        customer.transactions.unshift(`${customer.firstName} ${customer.lastName} withdrew ${amount}$!`);

        return `${customer.totalMoney}$`;
    }
    customerInfo(personalId) {
        let customer = this.findCustomer(personalId);
        let result = `Bank name: ${this.#bankName}
Customer name: ${customer.firstName} ${customer.lastName}
Customer ID: ${customer.personalId}
Total Money: ${customer.totalMoney}$
Transactions:`
        let count = customer.transactions.length;

        customer.transactions.forEach(transaction => {
            result += `\n${count}. ${transaction}`;
            count--;
        });

        return result;
    }

    findCustomer(personalId) {
        let customer = this.allCustomers.find(c => c.personalId == personalId);
        if (!customer) {
            throw new Error(`We have no customer with this ID!`);
        }
        return customer;
    }
}

let bank = new Bank("SoftUni Bank");

console.log(bank.newCustomer({ firstName: "Svetlin", lastName: "Nakov", personalId: 6233267 }));
console.log(bank.newCustomer({ firstName: "Mihaela", lastName: "Mileva", personalId: 4151596 }));

bank.depositMoney(6233267, 250);
console.log(bank.depositMoney(6233267, 250));
bank.depositMoney(4151596, 555);

console.log(bank.withdrawMoney(6233267, 125));

console.log(bank.customerInfo(6233267));
