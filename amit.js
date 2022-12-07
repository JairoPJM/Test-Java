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
        console.log(data[0].lat)
        console.log(data[0].lon)
        function getCrime() {
            const options = {
                method: 'GET',
                headers: 
                {
                    'x-api-key': 'k3RAzKN1Ag14xTPlculT39RZb38LGgsG8n27ZycG'
                }
            };
            var lat = data[0].lat;
            var long = data[0].lon
            fetch('https://api.crimeometer.com/v1/incidents/raw-data?lat='+lat+'&lon='+long+'&distance=10mi&datetime_ini=2020-01-01T11:33:54.000Z&datetime_end=2022-12-01T11:33:54.000Z&page=1',options)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.error(err));
        }
getCrime();
})
.catch(function() {
})
}
getLocation()
});
// function getWalkScore() {
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '3b327d0059msha07f2e8b5e08905p13aff9jsna9d2b3f3d9f3',
//             'X-RapidAPI-Host': 'walk-score.p.rapidapi.com'
//         }
//     };
//     var lat = data[0].lat
//     var lon = data[0].lon
//     var key = 'abda595364afb8f553e850e39711ae84'
//     var address = inputArr[0].trim()+'%2C%20' + inputArr[1].trim()
//     fetch('https://walk-score.p.rapidapi.com/score?lat=' + lat +'&address='+ address + '&wsapikey='+ key + '&lon='+ lon, options)
//     .then(response => response.text())
//     .then(data => {
//         console.log(data)
//         var dataJSON = parseFloat(data)
//         console.log(dataJSON.walkScore)
//     })
//     .catch(err => console.error(err));
// }
// getWalkScore();
let map;

function initMap() {
map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
});
}

window.initMap = initMap;
