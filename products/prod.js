let card_btn_user = document.getElementsByClassName("for_user");
let card_btn_admin = document.getElementsByClassName("for_admin");

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
// console.log("Logged-in user:", loggedInUser);
if (loggedInUser.isAdmin == true) {
  console.log("user is admin");
  for (let btn of card_btn_admin) {
    btn.style.display = "block";
  }
  for (let btn of card_btn_user) {
    btn.style.display = "none";
  }
} else {
  console.log("user is user");
  for (let btn of card_btn_admin) {
    btn.style.display = "none";
  }
  for (let btn of card_btn_user) {
    btn.style.display = "block";
  }
}

let loginElement = document.getElementById("login");

if (Object.keys(loggedInUser).length !== 0) {
  loginElement.innerHTML = `Log out`;
  loginElement.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    location.reload();
  });
} else {
  loginElement.innerHTML = `Log In`;
  loginElement.addEventListener("click", function () {
    window.location.href = "http://127.0.0.1:5500/login/sign-in/index.html";
  });
}
