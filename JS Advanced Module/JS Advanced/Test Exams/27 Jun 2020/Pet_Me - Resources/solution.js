function solve() {
    let inputElements = Array.from(document.getElementsByTagName('input'));
    let petListULEl = document.getElementById('adoption').lastElementChild;
    let adoptedListULEl = document.getElementById('adopted').lastElementChild;
    document.querySelector('#container button').addEventListener('click', onAddClick);

    let [nameEl, ageEl, kindEl, curOwnerEl] = inputElements;

    function onAddClick(e) {
        e.preventDefault();
        if (!nameEl.value || !kindEl.value || !curOwnerEl.value || !Number(ageEl.value)) {
            throw Error('Invalid input');
        }
        let petLiEl = document.createElement('li');
        petPEl = document.createElement('p');
        petPEl.innerHTML = `<strong>${nameEl.value}</strong> is a <strong>${ageEl.value}</strong> year old <strong>${kindEl.value}</strong>`;
        petSpanEl = document.createElement('span');
        petSpanEl.textContent = `Owner: ${curOwnerEl.value}`;
        petBtnEl = document.createElement('button');
        petBtnEl.textContent = `Contact with owner`;                                       

        petLiEl.appendChild(petPEl);
        petLiEl.appendChild(petSpanEl);
        petLiEl.appendChild(petBtnEl);
        petListULEl.appendChild(petLiEl);

        inputElements.map(e => e.value = "");

        petBtnEl.addEventListener('click', contactOwner);
    }

    function contactOwner(e) {
        let parentEl = e.target.parentElement;
        e.target.remove();
        let divEl = document.createElement('div');
        let inputEl = document.createElement('input');
        inputEl.setAttribute('placeholder', 'Enter your names');
        let btnEl = document.createElement('button');
        btnEl.textContent = 'Yes! I take it!';

        divEl.appendChild(inputEl);
        divEl.appendChild(btnEl);
        parentEl.appendChild(divEl);

        btnEl.addEventListener('click', movePet);
    }

    function movePet(e) {
        let divEl = e.target.parentElement;
        let liEl = divEl.parentElement;
        if(e.target.previousElementSibling.value == ""){
            return;
        }
        let spanEl = document.createElement('span');
        spanEl.textContent = `New Owner: ${e.target.previousElementSibling.value}`;
        let btnEl = document.createElement('button');
        btnEl.textContent = 'Checked';

        divEl.remove();
        liEl.lastElementChild.remove();

        liEl.appendChild(spanEl);
        liEl.appendChild(btnEl);
        adoptedListULEl.appendChild(liEl);

        btnEl.addEventListener('click', check);
    }

    function check(e) {
        e.target.parentElement.remove();
    }
}