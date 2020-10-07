function solve() {
  let inputEl = document.getElementsByTagName('textarea')[0];
  let outputEl = document.getElementsByTagName('textarea')[1];
  document.querySelectorAll('button')[0].addEventListener('click', addItems);
  document.querySelectorAll('button')[1].addEventListener('click', buyItems);
  let tbodyEl = document.querySelector('tbody');

  function addItems() {
    let items = JSON.parse(inputEl.value);

    for (let item of items) {
      let { name, img, price, decFactor } = item;
      let newRow = `<tr>
                      <td><img src="${img}"></td>
                      <td><p>${name}</p></td>
                      <td><p>${price}</p></td>
                       <td><p>${decFactor}</p></td>
                      <td><input type="checkbox" /></td>
                   </tr>`

      tbodyEl.insertAdjacentHTML('beforeEnd', newRow);
    }
    inputEl.value = "";
    // let rows = document.querySelectorAll('tbody tr');
    // console.log(rows.length);
  }


  function buyItems() {
    let checkedItems = document.querySelectorAll('input[type=checkbox');
    checkedItems = Array.from(checkedItems);
    let items = [];
    let totalPrice = 0;
    let avgDecFac = [];

    for (let check of checkedItems) {
      if (check.checked) {
        let item = check.parentElement.parentElement.querySelectorAll('p')[0];
        let price = check.parentElement.parentElement.querySelectorAll('p')[1];
        let factor = check.parentElement.parentElement.querySelectorAll('p')[2];

        items.push(item.textContent);
        totalPrice += Number(price.textContent);
        avgDecFac.push(Number(factor.textContent));
      }
    }
    avgDecFac = avgDecFac.reduce((a, b) => a + b) / avgDecFac.length;
    outputEl.value = `Bought furniture: ${items.join(", ")}\nTotal price: ${totalPrice.toFixed(2)}\nAverage decoration factor: ${avgDecFac}`;
  }
}