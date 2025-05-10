const dormantUser1 ={
      firstName: "Kingsley",
      lastName: "Sam",
      email: "kinsleyjon@gmail.com",
      password: "12345",
      isLoggedIn:false,
      id:crypto.randomUUID(),
      message: [],
    };

    const dormantUser2 ={
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "123456",
      isLoggedIn:false,
      id:crypto.randomUUID(),
      message: [],
    };
const registerBtn = document.getElementById("submit");

registerBtn.addEventListener("click", register);

function register(e) {
  e.preventDefault();

  const Fname = document.getElementById("Fname").value;
  const Lname = document.getElementById("Lname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm-password").value;
  
  if (Fname === "") {
    document.getElementById("Fname-error").textContent = "required";
  }

  if (Lname === "") {
    document.getElementById("Lname-error").textContent = "required";
  }

  if (email === "") {
    document.getElementById("email-error").textContent = "required";
  }

  if (password === "") {
    document.getElementById("password-error").textContent = "required";
  }

  if (confirm_password === "") {
    document.getElementById("confirm-password-error").textContent = "required";
  }

  if (password && password.length < 4) {
    document.getElementById("password-error").textContent =
      "password should be atleast 4 characters";
  }
  
  if (confirm_password && confirm_password !== password) {
    document.getElementById("confirm-password-error").textContent =
      "password mismatch";
  }

  if (
    Fname === "" ||
    Lname === "" ||
    email === "" ||
    password === "" ||
    confirm_password === ""
  ) {
    document.getElementById("error").textContent = "All fields are required";
  }  else{
    document.getElementById("error").textContent = "";
  }
  if(Fname && Lname && email && password && confirm_password && password.length >= 4 && password === confirm_password){
    document.getElementById("error").textContent = "";
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // get users from locl Storage
    let users = JSON.parse(localStorage.getItem("users")) || []
    let newUser= {
      firstName: Fname,
      lastName: Lname,
      email: email,
      password: hashedPassword,
      isLoggedIn:false,
      id:crypto.randomUUID(),
      message: [],
    };

    for(let i = 0; i< users.length; i++) {
      if(users[i].email === email) {
        alert ("user already exist")
        return
      }
    }
    users.push(newUser, dormantUser1, dormantUser2)
    localStorage.setItem("users", JSON.stringify(users))
    alert("Registration Successful")
    window.location.href = "login.html";
  }

}

function clearField(selector) {
  document.getElementById(selector).textContent = "";
}
