let logoutBtn = document.getElementById("logout");

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
document.getElementById("greetings").innerText += ` ${currentUser.firstName}`;

const users = JSON.parse(localStorage.getItem("users")) || [];

//  display other users as friends
function displayFriends(user) {
  let div = document.createElement("div");
  div.className = "friends-container";

  div.innerHTML = `<div class="flex items-center gap-4">
            <img
              src="./images/girl1.jpeg"
              alt=""
              class="rounded-full w-14 h-14"
            />
            <div class="flex flex-col">
              <h4 class="text-lgs font-medium">${user.firstName} ${user.lastName}</h4>
              <p>I'm trying</p>
            </div>
          </div>
          <span>14:56</span>`;

  document.getElementById("friends-list").appendChild(div);

  div.onclick = function () {
    document.getElementById("friend-div").innerHTML = `<img
            src="./images/girl4.jpeg"
            alt=""
            class="rounded-full w-14 h-14"
          />
          <div class="flex flex-col">
            <h4 class="text-2xl font-medium" id="current-friend-name">${user.firstName}</h4>
          </div>`;

          displayMessages(user.id)

    // // populate the  sender messages, find
    // let current = users.find(user => user.id === currentUser.id);

    
    //  document.getElementById("all-message-holder").innerHTML = ""
    // current.sentMessages.forEach(message => {
    //   if (message.sender === current.id && message.receiver === user.id) {
    //     let sentMessageHolder = document.createElement("p")
    //     sentMessageHolder.className = "message-sent"
    //     sentMessageHolder.innerText = message.message
    //     document.getElementById("all-message-holder").appendChild(sentMessageHolder)
    //   }
    // })

    // // populate the receiver messages
    // currentUser.ReceivedMessages.forEach(message => {
    //   if(message.receiver === current.id && message.sender === user.id) {
    //     let receivedMessageHolder = document.createElement("p")
    //     receivedMessageHolder.className = "message-recieved"
    //     receivedMessageHolder.innerText = message.message
    //     document.getElementById("all-message-holder").appendChild(receivedMessageHolder)
    //   }
    // })

    // addEVnet to the send message btn so you can get the user id
    const sendBtn = document.getElementById("send-message");
    sendBtn.onclick = function () {
      sendMessage(user.id);
    };
  };
}

// utilize the display function
users.map(user => {
  if (user.email !== currentUser.email) {
    displayFriends(user);
  }
});

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

      displayMessages(selectedUser.id)

//   currentUser.messages.forEach(message => {
      //     let sentholder = document.createElement("p")
      //     sentholder.className = "message-sent"
      //     sentholder.innerText = message.textMessage
      // document.getElementById("all-message-holder").appendChild(sentholder)
      //   })

      // const sentholder = document.createElement("p");
      // sentholder.className = "message-sent";
      // sentholder.innerText = textMessage;
    
      // document.getElementById("all-message-holder").appendChild(sentholder);

      //   currentUser.messages.forEach(message => {
      //     let sentholder = document.createElement("p")
      //     sentholder.className = "message-sent"
      //     sentholder.innerText = message.textMessage
      // document.getElementById("all-message-holder").appendChild(sentholder)
      //   })
    

    // console.log(selectedUser)
    //   console.log(currentUser)

    //   let receivedholder = document.createElement("p")
    // let sentholder = document.createElement("p")

    // sentholder.className = "message-sent"
    // receivedholder.className = "message-recieved"

    // sentholder.innerText = textMessage
    // document.getElementById("all-message-holder").appendChild(sentholder)
    // currentUser.messages.forEach(message => {
    //   sentholder.innerText = message.message

    //   document.getElementById("all-message-holder").appendChild(sentholder)
    //   // document.getElementById("all-message-holder").appendChild(receivedholder)
    //   })
  }
}

// function to display messages
function displayMessages(id){
  const messages = currentUser.message.filter(message => message.receiver === id && message.sender === currentUser.id || message.receiver === currentUser.id && message.sender === id)
  document.getElementById("all-message-holder").innerHTML = ""
  messages.forEach(message => {
    const sentholder = document.createElement("p")
    
        sentholder.className = currentUser.id === message.sender && message.receiver === id? "message-sent":"message-recieved"
        sentholder.innerText = message.message
    document.getElementById("all-message-holder").appendChild(sentholder)
  }) 
// currentUser.message.forEach(userMessage => {
//   if(userMessage.receiver === id && userMessage.sender === currentUser.id || userMessage.receiver === currentUser.id && userMessage.sender === id) {
//     const sentholder = document.createElement("p")
//  sentholder.className = currentUser.id === message.sender && message.receiver === id? "message-sent":"message-recieved"
//         sentholder.innerText = userMessage.message
//     document.getElementById("all-message-holder").appendChild(sentholder)

//   }
// })

}


logoutBtn.addEventListener("click", logout);

function logout() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
