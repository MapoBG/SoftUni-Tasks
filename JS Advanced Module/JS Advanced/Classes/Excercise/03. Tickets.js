function solve(ticketsArr, sortCriteria) {
    const result = [];

    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    ticketsArr.forEach(line => {
        let [destination, price, status] = line.split("|");
        price = Number(price);

        result.push(new Ticket(destination, price, status));
    });

    result.sort((a, b) => {
        if (sortCriteria == "price") {
            return a.price - b.price;
        } else {
            return a[sortCriteria].localeCompare(b[sortCriteria]);
        }
    });

    return result;
}


solve(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'status');
