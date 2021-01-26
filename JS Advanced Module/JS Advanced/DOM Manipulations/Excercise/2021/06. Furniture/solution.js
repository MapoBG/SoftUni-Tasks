function solve() {
  document.querySelectorAll('#exercise button')[0].addEventListener('click', addItems);
  document.querySelectorAll('#exercise button')[1].addEventListener('click', buyItems);
  let tbodyEl = document.querySelector('.table tbody');

  function addItems() {
    let inputEl = document.querySelector('#exercise textarea');
    let items = JSON.parse(inputEl.value);

    items.forEach(item => {
      const { name, img, price, decFactor } = item;
      const newRow = `<tr>
                      <td><img src="${img}"></td>
                      <td><p>${name}</p></td>
                      <td><p>${price}</p></td>
                      <td><p>${decFactor}</p></td>
                      <td><input type="checkbox" /></td>
                      </tr>`

      tbodyEl.insertAdjacentHTML('beforeend', newRow);                       // == tbodyEl.innerHTML += newRow; but the first option is faster
    });
  }

  function buyItems() {
    const outputEl = document.querySelectorAll('#exercise textarea')[1];
    const tRows = Array.from(document.querySelectorAll('tbody tr'));
    const items = [];
    let totalPrice = 0;
    let avgDecFac = [];

    tRows.forEach(row => {
      if (row.querySelector('input').checked) {
        const [itemEl, priceEl, decFactorEl] = row.querySelectorAll('p');

        items.push(itemEl.textContent);
        totalPrice += Number(priceEl.textContent);
        avgDecFac.push(Number(decFactorEl.textContent));
      }
    });

    avgDecFac = avgDecFac.reduce((a, b) => a + b) / avgDecFac.length;
    outputEl.textContent = `Bought furniture: ${items.join(", ")}\nTotal price: ${totalPrice.toFixed(2)}\nAverage decoration factor: ${avgDecFac}`;
  }
}