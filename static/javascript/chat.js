
const messageTypes = { LEFT: 'left', RIGHT: 'right', LOGIN: 'login' };

//grab ids and convert to variable
const chatWindow = document.getElementById('chat');
const messagesList = document.getElementById('messagesList');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

let name = '';
const nameInput = document.getElementById('nameInput');
const loginBtn = document.getElementById('loginBtn');
const loginWindow = document.getElementById('login');

const messages = []; // { author, content }

//Connect to socket.io - automatically tries to connect on same port app was served from
var socket = io();

socket.on('message', message => {
//Update type of message based on name
if (message.type !== messageTypes.LOGIN) {
  if (message.author === name) {
      message.type = messageTypes.RIGHT;
  } else {
      message.type = messageTypes.LEFT;
  }
}

messages.push(message);
displayMessages();

//scroll to the bottom
chatWindow.scrollTop = chatWindow.scrollHeight;
});

createMessageHTML = message => {
if (message.type === messageTypes.LOGIN) {
  return `
      <p class="secondary-text mb-2">${
          message.author
      } deelt mee aan de chat...</p>
  `;
}
return `
<div class="message ${
  message.type === messageTypes.LEFT ? 'message-left' : 'message-right'
}">
  <div class="flex">
      <p class="flex-grow-1 message-author">${
          message.type === messageTypes.LEFT ? message.author : ''
      }</p>
  </div>
  <p class="message-content">${message.content}</p>
</div>
`;
};

displayMessages = () => {
const messagesHTML = messages
  .map(message => createMessageHTML(message))
  .join('');
messagesList.innerHTML = messagesHTML;
};

sendBtn.addEventListener('click', e => {
e.preventDefault();
if (!messageInput.value) {
  return console.log('Invalid input');
}

const message = {
  author: name,
  content: messageInput.value
};
sendMessage(message);
//clear input
messageInput.value = '';
});

loginBtn.addEventListener('click', e => {
e.preventDefault();
if (!nameInput.value) {
  return console.log('Je moet een naam invullen');
}

//set the name and create logged in message
name = nameInput.value;
sendMessage({ author: name, type: messageTypes.LOGIN });

//show chat window and hide login
loginWindow.classList.add('hidden');
chatWindow.classList.remove('hidden');
});

sendMessage = message => {
socket.emit('message', message);
};