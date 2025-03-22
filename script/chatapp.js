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
    // console.log("hello world")
    // document.getElementById("send-message-container").style.display = "flex";
    console.log(user.id);
    let friend_div = document.createElement("div");
    friend_div.className = "friend-div";

    document.getElementById("friend-div").innerHTML = `<img
            src="./images/girl4.jpeg"
            alt=""
            class="rounded-full w-14 h-14"
          />
          <div class="flex flex-col">
            <h4 class="text-2xl font-medium" id="current-friend-name">${user.firstName}</h4>
          </div>`;

    // addEVnet to the send message btn so you can get the user id
    const sendBtn = document.getElementById("send-message");
    sendBtn.onclick = function () {
      sendMessage(user.id)
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
  let textMessage = document.getElementById("messages").value
// go to users and find the owner of this id
let selectedUser = users.find(user => user.id === id)

if(selectedUser) {
  let sentMessage = {
    sender: currentUser.id,
    receiver: selectedUser.id,
    message: textMessage
  }

  selectedUser.messages.push(sentMessage)
  
  if(currentUser){
    currentUser.messages.push(sentMessage)
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
      
    


    let sentholder = document.createElement("p")
    sentholder.className = "message-sent"
    sentholder.innerText = textMessage
document.getElementById("all-message-holder").appendChild(sentholder)

  //   currentUser.messages.forEach(message => {
  //     let sentholder = document.createElement("p")
  //     sentholder.className = "message-sent"
  //     sentholder.innerText = message.textMessage
  // document.getElementById("all-message-holder").appendChild(sentholder)
  //   })
   


  }
 

 
  
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


// console.log(currentUser)
// display the message
// if(currentUser.messages){
//   console.log(currentUser.messages)
// // let receivedholder = document.createElement("p")
// let sentholder = document.createElement("p")

// sentholder.className = "message-sent"
// // receivedholder.className = "message-recieved"

// currentUser.messages.forEach(message => {
// sentholder.innerText = message.message

// document.getElementById("all-message-holder").appendChild(sentholder)
// // document.getElementById("all-message-holder").appendChild(receivedholder)
// })

// }




// filter friends
// document.getElementById("searchInput").addEventListener("input", function (e) {
//   let string = e.target.value;s

//   console.log(foundUsers);
//   // users = foundUsers;
//   // displayUsers(foundUsers)
// });

logoutBtn.addEventListener("click", logout);

function logout() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
