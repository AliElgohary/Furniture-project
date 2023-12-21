const validateSignIn = (email, password) => {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  console.log(theUser);
  return users.some(
    (user) => user.email === email && user.password === password
  );
};

let signedIn = false; 

document.getElementById("signinForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  if (validateSignIn(email, password)) {
    signedIn = true;
    console.log("Sign-in successful!");
  } else {
    console.log("Invalid email or password. Please try again.");
  }
});

console.log(signedIn);
