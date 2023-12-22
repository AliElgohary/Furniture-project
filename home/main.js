let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
console.log("Logged-in user:", loggedInUser);
if(loggedInUser.isAdmin == true) {
    console.log("user is admin");
}
if(loggedInUser.isAdmin == false) {
    console.log('user is not admin');
}
