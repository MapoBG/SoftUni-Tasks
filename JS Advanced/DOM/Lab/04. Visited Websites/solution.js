function solve() {
  let clickableElements = document.getElementsByClassName("link-1");
  let listen = document.getElementById("middled");

  console.log(clickableElements);
  listen.addEventListener( 'click' , solve );
}