function solve() {
   let addButtonElement = document.getElementsByClassName('add-product');
   let checkoutButton = document.getElementsByClassName('checkout')[0];
   let textAreaElement = document.getElementsByTagName('textarea')[0];

   checkoutButton.addEventListener('click', calculateTotalPrice);
   addButtonElement = Array.from(addButtonElement);
   for (let button of addButtonElement) {
      button.addEventListener('click', addProductToCart);
   }

   var cartList = {};

   function addProductToCart(event) {
      let targetButtonParrentEl = event.target.parentElement;
      let priceElement = targetButtonParrentEl.nextElementSibling;
      let itemElement = targetButtonParrentEl.previousElementSibling.firstElementChild;
      let price = Number(priceElement.innerHTML);
      let item = itemElement.innerHTML;

      textAreaElement.textContent += `Added ${item} for ${price.toFixed(2)} to the cart.\n`;

      if (!cartList[item]) {
         cartList[item] = price;
      } else {
         cartList[item] += price;
      }
   }

   function calculateTotalPrice() {
      let items = Object.keys(cartList).join(", ");
      let totalPrice = 0;
      for (let key in cartList) {
         totalPrice += cartList[key];
      }
      textAreaElement.textContent += `You bought ${items} for ${totalPrice.toFixed(2)}.`
      for (let buton of addButtonElement) {
         buton.removeEventListener('click', addProductToCart);
      }
      checkoutButton.removeEventListener('click', calculateTotalPrice);
   }
}