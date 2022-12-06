// public class Main {

//     public static void main(String[] args) {

//         // if statement = performs a block of code if it's condition evaluates to be true

//         int age = 75;

//         if(age==75) {
//             System.out.println("Ok Boomer!");
//         }
//         else if(age>=18) {
//             System.out.println("You are an adult!");
//         }
//         else if(age>=13) {
//             System.out.println("You are a teenager!");
//         }
//         else {
//             System.out.println("You are not an adult!");
//         }

//     }
// }

// var btn = document.getElementById('click')

// function getAPI() {
//     $.ajaxSetup({
//         url: "https://api.walkscore.com" + ajax.data
//     });
//     $.ajax({data: {
//         address : '1119 8th Ave S, Seattle, WA,',
//         lat : '47.6085',
//         lon : '-122.3295',
//         wsapikey : 'abda595364afb8f553e850e39711ae84',
//     }})

// fetch(url, {
//     method: 'GET',
//     mode: 'no-cors',
//     credentials: 'same-origin',
// })
// .then(function (response) {
//     return response.json()
// })
// .then(function (data) {
//     console.log(data);
// });
// }
// btn.addEventListener('click', getAPI)
$('#form').submit( function(e) {
    e.preventDefault();
    var input = $('#search').val();
    var inputArr = input.split(',')
    console.log(inputArr)


function getLocation(city,state) {
    var key = 'b5d6abd64c1bcaf907e06b633fed6528';
    var city = inputArr[0];
    var state = inputArr[1];
    var country = '';
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+city+','+ state +','+country + '&limit=5&appid=' + key)
    .then(function(resp) { return resp.json() })
    .then(function(data) {
        console.log(data)
    })
    .catch(function(){
    });
}
getLocation();
});
