function solve() {
    let olArray = document.getElementsByTagName("li");
    let inputElement = document.getElementsByTagName("input")[0];
    let addButton = document.getElementsByTagName("button")[0];

    addButton.addEventListener("click", addName);

    let alphabet = {};
    let counter = 0;

    for (let i = 65; i < 91; i++) {
        let letter = String.fromCharCode(i);
        alphabet[letter] = counter;
        counter++;
    }

    console.log(olArray[15].innerHTML);


    function addName() {
        let firstLetter = inputElement.value[0].toUpperCase();
        let listIndex = alphabet[firstLetter];
        let name = firstLetter + inputElement.value.slice(1).toLowerCase();

        if (olArray[listIndex].innerHTML !== "") {
            olArray[listIndex].innerHTML += ", ";
        }
        olArray[listIndex].innerHTML += name;
        inputElement.value = "";

        // ==============SORTING ================
/*         for (let i = 0; i < olArray.length; i++) {
            let listItem = olArray[i];
            if (listItem.innerHTML !== "") {
                let namesArr = listItem.innerHTML.split(", ").sort((a, b) => a.localeCompare(b));
                olArray[i].innerHTML = namesArr.join(", ")
            }
        } */
    }
}