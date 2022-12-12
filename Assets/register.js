function signUp(e){
    console.log("signUp")
    event.preventDefault();

var name = document.getElementById('name').value;
var email = document.getElementById('email-signup').value;
var password = document.getElementById('password-signup').value;
console.log("name = ", name);
console.log("email = ", email);
console.log("password = ", password);

var user = { 
    name: name,
    email: email,
    password: password,
};

var json = JSON.stringify(user);
localStorage.setItem(email, json);
console.log('user added');


if(name=="admin" && email=="admin@gmail.com" && password=="admin123"){
    window.location.assign("index.html");
    alert("Login Successful");
}
else{
    alert("Invalid Information");
    return;
}
}



// Declared variables
var signUp1 = document.querySelector("#signUp");



// Retreives local stroage 
var userInfo = localStorage.getItem("userInfo");
userInfo = JSON.parse(userInfo);

if (userInfo !== null) {

    for (var i = 0; i < userInfo.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = userInfo[i].initials + " " + userInfo[i].score;
        signUp1.appendChild(createLi);

    }
}
