$(document).ready(function () {
  $("#chat-list").niceScroll({
    cursorcolor: "rgba(0,0,0,0.3)",
    cursoropacitymax: 1,
    touchbehavior: false,
    cursorwidth: "8px",
    cursorborder: "0",
    cursorborderradius: "8px",
  });

  $("#messages").niceScroll({
    cursorcolor: "rgba(0,0,0,0.3)",
    cursoropacitymax: 1,
    touchbehavior: false,
    cursorwidth: "8px",
    cursorborder: "0",
    cursorborderradius: "8px",
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleThemeButton = document.querySelector(".toggle-theme-button");

  toggleThemeButton.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
  });
});

async function fetchUsers() {
  const response = await fetch("https://randomuser.me/api/?results=15");
  const data = await response.json();
  return data.results;
}

function createUserChatItem(user, index) {
  const chatItem = document.createElement("div");
  chatItem.className = "chat-item";
  if (index % 2 === 0) {
    chatItem.classList.add("alt");
  }

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.style.backgroundImage = `url(${user.picture.thumbnail})`;

  const chatInfo = document.createElement("div");
  chatInfo.className = "chat-info";

  const userName = document.createElement("h3");
  userName.textContent = `${user.name.first} ${user.name.last}`;

  const lastMessage = document.createElement("p");
  lastMessage.textContent = "Last message...";

  chatInfo.appendChild(userName);
  chatInfo.appendChild(lastMessage);
  chatItem.appendChild(avatar);

  // Adiciona o balão de notificações dentro do item de chat
  const unreadMessages = document.createElement("div");
  unreadMessages.className = "unread-messages";
  unreadMessages.textContent = Math.floor(Math.random() * 85); // Quantidade aleatória de mensagens não lidas
  chatItem.appendChild(unreadMessages);

  chatItem.appendChild(chatInfo);

  return chatItem;
}

async function populateChatList() {
  const chatList = document.getElementById("chat-list");
  const users = await fetchUsers();

  users.forEach((user) => {
    const chatItem = createUserChatItem(user);
    chatList.appendChild(chatItem);
  });
}

document.addEventListener("DOMContentLoaded", populateChatList);
