function solve() {
   document.getElementsByTagName('body')[0].addEventListener('click', cards);
   let [spanP1, vs, spanP2] = document.getElementsByTagName('span');
   let historyDivEl = document.getElementById('history');
   let p1Card;
   let p2Card;

   function cards(e) {
      let p1Cards = document.getElementById('player1Div');
      let p2Cards = document.getElementById('player2Div');

      if (e.target.parentElement == p1Cards) {
         e.target.src = "images/whiteCard.jpg";
         spanP1.textContent = e.target.name;
         p1Card = e.target.name;
      } else if (e.target.parentElement == p2Cards) {
         e.target.src = "images/whiteCard.jpg";
         spanP2.textContent = e.target.name;
         p2Card = e.target.name;
      }

      if (p1Card && p2Card) {
         let p1PlayedCards = document.querySelectorAll('#player1Div > img');
         let p2PlayedCards = document.querySelectorAll('#player2Div > img');
         p1PlayedCards = Array.from(p1PlayedCards);
         p2PlayedCards = Array.from(p2PlayedCards);
         let currentP1Card;
         let currentP2Card;
         for (let card of p1PlayedCards) {
            if (card.name == p1Card) {
               currentP1Card = card;
            }
         }

         for (let card of p2PlayedCards) {
            if (card.name == p2Card) {
               currentP2Card = card;
            }
         }

         if (Number(spanP1.textContent) > Number(spanP2.textContent)) {
            currentP1Card.style = 'border: 2px solid green';
            currentP2Card.style = 'border: 2px solid red';
         } else if (Number(spanP1.textContent) < Number(spanP2.textContent)) {
            currentP2Card.style = 'border: 2px solid green';
            currentP1Card.style = 'border: 2px solid red';
         }
         historyDivEl.textContent += `[${p1Card} vs ${p2Card}] `;
         p1Card = "";
         p2Card = "";
         spanP1.textContent = "";
         spanP2.textContent = "";
      }
   }
}