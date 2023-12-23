let card_btn_user=document.getElementsByClassName('for_user');
let card_btn_admin=document.getElementsByClassName('for_admin');


let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
// console.log("Logged-in user:", loggedInUser);
if (loggedInUser.isAdmin == true) {
    console.log("user is admin");
    for(let btn of card_btn_admin){
      btn.style.display='block';
     }
     for(let btn of card_btn_user){
      btn.style.display='none';
     }
}
if (loggedInUser.isAdmin == false) {
    console.log("user is user");
      for(let btn of card_btn_admin){
        btn.style.display='none';
      }
      for(let btn of card_btn_user){
        btn.style.display='block';
      }
}
