function calcIncome(input) {
    let line = input.shift();
    let validLine = /%(?<name>[A-Z][a-z]+)%([^|$%.]*)<(?<product>\w+)>([^|$%.]*)\|(?<qty>\d+)\|([^|$%.\d]*)(?<price>[\d]+\.?[\d]+)\$/.exec(line);
    let totalIncome = 0;

    while (line != 'end of shift') {
        if(validLine){
            let totalPrice = Number(validLine.groups.qty) * Number(validLine.groups.price);
            totalIncome += totalPrice;
            console.log(`${validLine.groups.name}: ${validLine.groups.product} - ${totalPrice.toFixed(2)}`);
        }
        line = input.shift();
        validLine = /%(?<name>[A-Z][a-z]+)%([^|$%.]*)<(?<product>\w+)>([^|$%.]*)\|(?<qty>\d+)\|([^|$%.\d]*)(?<price>[\d]+\.?[\d]+)\$/.exec(line);
    }
    console.log(`Total income: ${totalIncome.toFixed(2)}`);
}
calcIncome([
    '%InvalidName%<Croissant>|2|10.3$',
    '%Peter%<Gum>1.3$',
    '%Maria%<Cola>|1|2.4',
    '%Valid%<Valid>valid|10|valid20$',
    'end of shift'
  ])