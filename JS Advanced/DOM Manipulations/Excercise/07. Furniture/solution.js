function solve() {
  document.querySelectorAll('button')[0].addEventListener('click', addItems);
  document.querySelectorAll('button')[1].addEventListener('click', buyItems);
  let tbodyEl = document.querySelector('tbody')

  function addItems() {
    let inputEl = document.getElementsByTagName('textarea')[0];
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
  }

  function buyItems() {
    let outputEl = document.getElementsByTagName('textarea')[1];
    let tRows = document.querySelectorAll('tbody tr')
    tRows = Array.from(tRows);
    let items = [];
    let totalPrice = 0;
    let avgDecFac = [];

    for (let row of tRows) {
      if (row.querySelectorAll('input')[0].checked) {
        let data = row.querySelectorAll('p');

        items.push(data[0].textContent);
        totalPrice += Number(data[1].textContent);
        avgDecFac.push(Number(data[2].textContent));
      }
    }
    avgDecFac = avgDecFac.reduce((a, b) => a + b) / avgDecFac.length;
    outputEl.textContent = `Bought furniture: ${items.join(", ")}\nTotal price: ${totalPrice.toFixed(2)}\nAverage decoration factor: ${avgDecFac}`;
  }
}