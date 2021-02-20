function solve() {
   document.querySelector(".create").addEventListener("click", createPost);
   postsEl = document.querySelector(".site-content>main>section");
   postsEl.addEventListener("click", moveArticles);

   function createPost(e) {
      e.preventDefault();

      const formEl = e.target.parentElement;
      const [authorInput, titleInput, catInput, contentInput] = Array.from(formEl.elements);

      if (!authorInput.value && !titleInput.value && !catInput.value && !contentInput.value) {
         return;
      }

      const articleEl = createEl("article");

      const h1El = createEl("h1", titleInput.value);

      const pCatEl = createEl("p", "Category: ");
      const strongCatEl = createEl("strong", catInput.value);
      pCatEl.appendChild(strongCatEl);

      const pAuthorEl = createEl("p", "Creator: ");
      const strongAuthorEl = createEl("strong", authorInput.value);
      pAuthorEl.appendChild(strongAuthorEl);

      const pContentEl = createEl("p", contentInput.value);

      const divEl = createEl("div", "", "buttons");
      const delBtn = createEl("button", "Delete", "btn", "delete");
      const archiveBtn = createEl("button", "Archive", "btn", "archive");
      divEl.appendChild(delBtn);
      divEl.appendChild(archiveBtn);

      articleEl.appendChild(h1El);
      articleEl.appendChild(pCatEl);
      articleEl.appendChild(pAuthorEl);
      articleEl.appendChild(pContentEl);
      articleEl.appendChild(divEl);

      postsEl.appendChild(articleEl);
   }

   function moveArticles(e) {
      if (e.target.tagName != "BUTTON") {
         return;
      }

      const currentArticleEl = e.target.parentElement.parentElement;

      if (e.target.textContent == "Delete") {
         currentArticleEl.remove();
      } else if (e.target.textContent == "Archive") {
         const archiveOlEl = document.querySelector(".archive-section ol");

         const liEl = createEl("li", currentArticleEl.firstElementChild.textContent);

         currentArticleEl.remove();

         archiveOlEl.appendChild(liEl);

         const allOlEls = Array.from(archiveOlEl.children);

         allOlEls
            .sort((e1, e2) => e1.textContent.localeCompare(e2.textContent))
            .forEach(e => archiveOlEl.appendChild(e));

      }
   }

   function createEl(el, text, ...classNames) {
      result = document.createElement(el);

      if (text) {
         result.textContent = text;
      }

      if (classNames) {
         classNames.forEach(className => {
            result.classList.add(className);
         });
      }

      return result;
   }
}