//Sign up Function

function signup(e){
    event.preventDefault();
    
    var email = document.getElementById('email').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var user = {
        email: email,
        username: username,
        password: password,
};

var json = JSON.stringify(user);
localStorage.setItem("key", json);
console.log('user added');
}


function signIn() {
    var emails = document.getElementById('emails').value;
    var passwords = document.getElementById('passwords').value;
    for(let i=0; i < localStorage.length; i++){
        var item = JSON.parse(localStorage.getItem(localStorage.key(i)))
        console.log(item)
        if(emails == item.email && passwords == item.password){
            //next page
            window.alert('ok')
            } else {
                window.alert('invalid login')
            }
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

