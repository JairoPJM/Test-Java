// Start function to register
function signUp(e){
    console.log("signUp")
    event.preventDefault();

//Returnring element by id that matches the specified string
var name = document.getElementById('name').value;
var email = document.getElementById('email-signup').value;
var password = document.getElementById('password-signup').value;
//Function to print information to the console
//The easiest way to view the output of a string is to print it to the console, with console.log()
console.log("name = ", name);
console.log("email = ", email);
console.log("password = ", password);

// User input variables:
var user = { 
    name: name,
    email: email,
    password: password,
};

var json = JSON.stringify(user);
localStorage.setItem(email, json);
console.log('user added');

//If statement for user validation/registration 
if(name=="admin" && email=="admin@gmail.com" && password=="admin123"){
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



// Declared variable
var signUp1 = document.querySelector("#signUp");



// Retrives local stroage 
var userInfo = localStorage.getItem("userInfo");
userInfo = JSON.parse(userInfo);

if (userInfo !== null) {

    for (var i = 0; i < userInfo.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = userInfo[i].initials + " " + userInfo[i].score;
        signUp1.appendChild(createLi);

    }
}
