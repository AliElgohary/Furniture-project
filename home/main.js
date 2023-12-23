let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
console.log("Logged-in user:", loggedInUser);

if (loggedInUser.isAdmin === true) {
  console.log("user is admin");
} else if (loggedInUser.isAdmin === false) {
  console.log("user is not admin");
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
