function printProductGroups(input) {
    let numberOfString = input.shift();
    let barcodePattern = /@[#]+[A-Z][A-Za-z\d]{4,}[A-Z]@[#]+/;

    for (let i = 0; i < numberOfString; i++) {
        let line = input[i];
        let barcode = line.match(barcodePattern);
        if (barcode) {
            let productGroupPattern = /[\d]/g
            let productGroup = barcode[0].match(productGroupPattern);
            if (productGroup) {
                console.log(`Product group: ${productGroup.join("")}`);
            } else {
                productGroup = "00";
                console.log(`Product group: ${productGroup}`);
            }
        } else {
            console.log("Invalid barcode");
        }
    }
}
printProductGroups(['3', '@#FreshFisH@#', '@###Brea0D@###', '@##Che46sE@##']);