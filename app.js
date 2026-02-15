const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const clearChatBtn = document.getElementById('clear-chat');
const themeToggle = document.querySelector('.theme-toggle');

// Emoji replacement map
const emojiMap = {
  ':)': '🙂',
  ':D': '😃',
  ':(': '🙁',
  '<3': '❤️'
};

function replaceEmojis(text) {
  for (const key in emojiMap) {
    text = text.split(key).join(emojiMap[key]);
  }
  return text;
}

function addMessage(text) {
  const msg = document.createElement('div');
  msg.classList.add('message'); // no sent/received distinction now
  
  const timestamp = document.createElement('span');
  timestamp.classList.add('timestamp');
  const now = new Date();
  timestamp.textContent = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  msg.innerHTML = replaceEmojis(text) + ' ';
  msg.appendChild(timestamp);
  
  chatWindow.appendChild(msg);
  
  // Auto-scroll
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (text !== '') {
    addMessage(text);
    messageInput.value = '';
    messageInput.focus();
  }
}

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

clearChatBtn.addEventListener('click', () => {
  chatWindow.innerHTML = '';
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
