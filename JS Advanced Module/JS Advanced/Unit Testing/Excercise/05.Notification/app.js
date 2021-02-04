function notify(message) {
  const divEl = document.getElementById("notification");
  divEl.addEventListener("click", hideDiv);

  divEl.style.display = "block";
  divEl.textContent = message;

  function hideDiv() {
    divEl.style.display = "none";
  }
}