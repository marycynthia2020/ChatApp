const logoutBtn = document.getElementById("logout");
const searchInput = document.getElementById("searchInput");
const container = document.querySelector(".container");
const firstContainer = document.querySelector(".first");
const secondContainer = document.querySelector(".second");
const hamburger = document.querySelector(".hamburger")
const mobile = document.querySelector(".mobile")

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
  // to generate avatar for users
  const imageDiv = document.createElement("div");
  imageDiv.className = "imageDiv";
  const firstLetter = user.firstName.slice(0, 1);
  const secondLetter = user.lastName.slice(0, 1);
  imageDiv.innerHTML = `<span class = "text-lg">${firstLetter}${secondLetter}</span>`;

  const div = document.createElement("div");
  div.className = "friends-container";
  div.appendChild(imageDiv);

  div.innerHTML += `
          <h4 class="text-lg font-semibold">${user.firstName}  ${user.lastName}</h4>
        `;
  document.getElementById("friends-list").appendChild(div);

  // Add onclick to each div so that on click, we can get the exact user
  div.onclick = function () {
    document.querySelector(".open-text").style.display ="none"
    document.getElementById("send-message-container").style.display = "flex";
    document.getElementById("friend-div").style.display = "flex";
    document.getElementById("friend-div").innerHTML = `
        
          <div class="" id="current-friend-name ">${user.firstName} ${user.lastName}</div>
        `;
    displayMessages(user.id);

    // if (secondContainer.style.display === "!flex") {
    //   console.log("hi")
    //   firstContainer.style.backgroundColor= "red";
      // secondContainer.classList.remove("hidden");
    
    // else {
    //   firstContainer.style.display = "block";
    //   secondContainer.classList.remove("hidden");
    // }

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
      timestamp: new Date().getTime(),
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
      userMessage.receiver === id &&
      userMessage.sender === currentUser.id
      // (userMessage.receiver === currentUser.id && userMessage.sender === id)
    ) {
      const messageHolder = document.createElement("div");
      const textHolder = document.createElement("p");
      let timeHolder = document.createElement("p");

      timeHolder.className = "time";
      messageHolder.className =
        currentUser.id === userMessage.sender && userMessage.receiver === id
          ? "message-sent"
          : "message-recieved";
      textHolder.innerText = userMessage.message;
      timeHolder.innerHTML = formatsTime(userMessage.timestamp);
      messageHolder.appendChild(textHolder);
      messageHolder.appendChild(timeHolder);
      document.getElementById("all-message-holder").appendChild(messageHolder);
    }
  });
}

//Searching of friends by first name and last name
searchInput.addEventListener("input", searchFriends);

function searchFriends(e) {
  let string = e.target.value;
  const friends = users.filter(user => user.id !== currentUser.id);

  let foundFriends = friends.filter(friend => {
    return (
      friend.firstName.startsWith(string) || friend.lastName.startsWith(string)
    );
  });
  if (foundFriends) {
    document.getElementById("friends-list").innerHTML = "";
    foundFriends.map(friend => {
      displayFriends(friend);
    });
  }
}


// mobile Responsiveness
hamburger.addEventListener("click", function() {
  console.log("hi")
  mobile.classList.toggle("mobileView")
   hamburger.src = "/images/close.svg"
})


logoutBtn.addEventListener("click", logout);

function logout() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

function formatsTime(timestamp) {
  const date = new Date(timestamp);
  return date.getHours() + ":" + date.getMinutes();
}
