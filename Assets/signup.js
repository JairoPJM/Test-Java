//Sign up Function

function signup(e){
    e.preventDefault();


var email = document.getElementById('email').value;
var username = document.getElementById('username').value;
var password = document.getElementById('password').value;


var user = {
    email: email,
    username: username,
    password: password,
};

var json = JSON.stringify(user);
localStorage.setItem(username, json);
console.log('user added');
}





























// Declared variables
var signUp = document.querySelector("#signUp");



// Retreives local stroage 
var userInfo = localStorage.getItem("userInfo");
userInfo = JSON.parse(userInfo);

if (userInfo !== null) {

    for (var i = 0; i < userInfo.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = userInfo[i].initials + " " + userInfo[i].score;
        signUp.appendChild(createLi);

    }
}

