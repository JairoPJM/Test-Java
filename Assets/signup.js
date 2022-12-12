// Start function to Login
function signIn(e){
    console.log("signIn")
    event.preventDefault();

//Returnring element by id that matches the specified string
var email = document.getElementById('email-login').value;
var password = document.getElementById('password-login').value;

// User input variables:
var user = {
    email: email,
    password: password,
};

var json = JSON.stringify(user);
localStorage.setItem(email, json);
console.log('user added');

// if statement for user validation/login 
if(email=="admin@gmail.com" && password=="admin123"){
    //The window will load and display the index.html document
    window.location.assign("index.html");
     // Validates user input
    // Start user input prompts
    alert("Login Successful");
}
else{
    // Validates user input
    // Start user input prompts
    alert("Invalid Information");
    return;
}
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





















