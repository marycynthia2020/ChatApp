const logoutBtn = document.getElementById("logout");
const searchInput = document.getElementById("searchInput")

const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
document.getElementById("greetings").innerText += ` ${currentUser.firstName}`;

let users = JSON.parse(localStorage.getItem("users")) || [];

//  display other users as friends
users.map(user => {
  if (user.email !== currentUser.email) {
    displayFriends(user);
  }
});

function displayFriends(user) {
  const div = document.createElement("div");
  div.className = "friends-container";

  div.innerHTML = `
          <img
            src="./images/girl1.jpeg"
            alt=""
            class="rounded-full w-14 h-14"
          />
            <h4 class="text-lgs font-medium">${user.firstName} ${user.lastName}</h4>
        `;
  document.getElementById("friends-list").appendChild(div);

  // Add onclick to each div so that on click, we can get the exact user
  div.onclick = function () {
    document.getElementById("send-message-container").style.display = "flex";
    document.getElementById("friend-div").innerHTML = `
            <img
            src="./images/girl1.jpeg"
            alt=""
            class="rounded-full w-14 h-14"
          />
          <h4 class="text-2xl font-medium" id="current-friend-name">${user.firstName} ${user.lastName}</h4>
        `;
    displayMessages(user.id);

    // add event to the send message btn so you can get the user id
    const sendBtn = document.getElementById("send-message");
    sendBtn.onclick = function () {
      sendMessage(user.id);
    };
  };
}

// sendMessage function
function sendMessage(id) {
  const textMessage = document.getElementById("messages").value;

  // go to users and find the owner of this id
  const selectedUser = users.find(user => user.id === id);
  if (selectedUser) {
    const message = {
      sender: currentUser.id,
      receiver: selectedUser.id,
      message: textMessage,
    };
    selectedUser.message.push(message);
    localStorage.setItem("users", JSON.stringify(users));

    const current = users.find(user => user.id === currentUser.id);
    // update the current user both in users and current users
    currentUser.message.push(message);
    current.message.push(message);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("users", JSON.stringify(users));

    displayMessages(selectedUser.id);
  }
}

// function to display messages
function displayMessages(id) {
  document.getElementById("all-message-holder").innerHTML = "";
  currentUser.message.forEach(userMessage => {
    if (
      (userMessage.receiver === id && userMessage.sender === currentUser.id) ||
      (userMessage.receiver === currentUser.id && userMessage.sender === id)
    ) {
      const sentholder = document.createElement("p");
      sentholder.className =
        currentUser.id === userMessage.sender && userMessage.receiver === id
          ? "message-sent"
          : "message-recieved";
      sentholder.innerText = userMessage.message;
      document.getElementById("all-message-holder").appendChild(sentholder);
    }
  });
}

logoutBtn.addEventListener("click", logout);
function logout() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  if (currentUser) {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  }
}

//Searching of friends by first name and last name
searchInput.addEventListener("input", searchFriends)

function searchFriends(e){
  let string = e.target.value
  const friends = users.filter(user => user.id !== currentUser.id)

  let foundFriends =  friends.filter(friend => {
    return friend.firstName.startsWith(string) || friend.lastName.startsWith(string)
  })
  if(foundFriends) {
    document.getElementById("friends-list").innerHTML = ""
      foundFriends.map(friend => {
        displayFriends(friend);
      })
  } 
  
  
}
