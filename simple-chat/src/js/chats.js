import "../css/buttons.css";
import "../css/general.css";

import "../css/chats/chats-box.css";
import "../css/chats/chats-header.css";
import "../css/chats/create-button.css";

const chat = document.querySelector(".chats-box");

chat.addEventListener('click', goToChat.bind(this))

function goToChat() {
  window.location.href = './messages.html';
}
