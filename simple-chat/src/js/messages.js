import "../css/buttons.css";
import "../css/general.css";

import "../css/messages/messages-box.css";
import "../css/messages/messages-container.css";
import "../css/messages/messages-form.css";
import "../css/messages/messages-header.css";

const form = document.querySelector(".messages-form");
const input = document.querySelector(".form-input");
const chat = document.querySelector(".messages-box");
const back_button = document.querySelector('.back-button')

form.addEventListener("submit", handleSubmit.bind(this));
document.addEventListener(
  "DOMContentLoaded",
  getMesagesFromLocalStorage.bind(this)
);
back_button.addEventListener('click', goToChats.bind(this))

function goToChats(event) {
  window.location.href = '../chats.html';
}

function handleSubmit(event) {
  event.preventDefault();
  const message = {
    text: input.value,
    time: `${new Date().toLocaleTimeString("ru", {
      hour: "numeric",
      minute: "numeric",
    })}`,
  };
  createMessage(message);
  saveMessageToLocalStorage(message);
  input.value = "";
}

function handleKeyPress(event) {
  if (event.keyCode === 13) {
    form.dispatchEvent(new Event("submit"));
  }
}

function createMessage(message) {
  debugger;
  const messageContainer = document.createElement("div");
  messageContainer.className = "message right";

  const text = document.createElement("span");
  text.className = "text";
  text.innerText = message.text;

  const time = document.createElement("span");
  time.className = "time";
  time.innerText = message.time;

  const done_all = document.createElement("div");
  done_all.className = "done-all";
  done_all.innerHTML = '<span class="material-icons">done_all</span>';

  const data = document.createElement("div");
  data.className = "data";
  data.append(...[time, done_all]);

  messageContainer.append(...[text, data]);
  chat.prepend(messageContainer);
}

function saveMessageToLocalStorage(message) {
  let messages = localStorage.getItem("messages") || "[]";
  messages = JSON.parse(messages);
  messages.push(message);
  localStorage.setItem("messages", JSON.stringify(messages));
}

function getMesagesFromLocalStorage() {
  let messages = localStorage.getItem("messages") || "[]";
  messages = JSON.parse(messages);
  for (const message of messages) {
    createMessage(message);
  }
}
