function solve() {
   let sendButtonElement = document.getElementById('send');
   let chatInputElement = document.getElementById('chat_input');
   let chatMessegesElement = document.getElementById('chat_messages');

   sendButtonElement.addEventListener('click', addMsg);

   function addMsg(){
      let newMsg = document.createElement('div');
      newMsg.setAttribute('class', 'message my-message');

      newMsg.innerHTML = chatInputElement.value;
      chatMessegesElement.appendChild(newMsg);
      chatInputElement.value = "";
   }
}


