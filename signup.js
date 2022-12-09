var card = document.getElementById("card");

function openRegister(){
    card.style.transform = "rotateY(-180deg)";
}

function openLogin(){
    card.style.transform = "rotateY(0deg)";
}

var logins = [
    {
        name: "minjae",
        email: "jaecho203@gmail.com",
        password: "qwer1234"
    }
]

$('#login').submit(function(e) {
    e.preventDefault();
    function getLogin() {
        var userEmail = document.getElementById('userEmail').value
        var userPassword = document.getElementById('userPassword').value
        for(let i =0; i < logins.length; i++) {
            if(userEmail === logins[i].email && userPassword === logins[i].password){
                location.replace("index.html");
            }else {
                window.alert("Email or Password is Wrong!")
                return;
            }
        }
    }
    getLogin()
})
$('#register').submit(function(e) {
    e.preventDefault();
    var newName = document.getElementById('regName').value
    var newEmail = document.getElementById('regEmail').value
    var newPassword = document.getElementById('regPassword').value
            this.name = newName,
            this.email = newEmail,
            this.password = newPassword
}) 