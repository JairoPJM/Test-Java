<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 2d04ca6003e978d64bf2a09ab7b5912544e56bd0
=======
>>>>>>> 73884be4e2e25a6d6a6c5096ddccf77f3bf97fb0
var aboutUsBtn=document.querySelector("#ab")
var randomPageSection=document.querySelector("#random-page")
var randomBtn=document.querySelector("#random")
var aboutUsSection=document.querySelector(".about-us-section")
var mainPageSection=document.querySelector(".main-page")
var mainPageBtn=document.querySelector("#home-page")
var randomizedSection=document.querySelector("#randomized")
var randomizedBtn=document.querySelector("#random")
var randomizedPageSection=document.querySelector("#randomized-page-section")

mainPageBtn.addEventListener("click",function(){
    console.log("hey")
    aboutUsSection.hidden=true
    mainPageSection.hidden=false
    randomizedSection.hidden=true
    randomizedBtn.hidden=true
<<<<<<< HEAD
<<<<<<< HEAD
=======
    location.reload()
>>>>>>> 2d04ca6003e978d64bf2a09ab7b5912544e56bd0
=======
    location.reload()
>>>>>>> 73884be4e2e25a6d6a6c5096ddccf77f3bf97fb0

})
randomBtn.addEventListener("click",function(){
    console.log("hello")
    mainPageSection.hidden=true
    aboutUsSection.hidden=true
    randomizedBtn.hidden=true
})
aboutUsBtn.addEventListener("click",function(){
    console.log("H!")
    mainPageSection.hidden=true
    aboutUsSection.hidden=false
<<<<<<< HEAD
})
<<<<<<< HEAD
randomPageSection.addEventListener("click",function(){
    console.log("HI!")
    mainPageSection.hidden=false
    aboutUsSection.hidden=true
})
=======
// randomPageSection.addEventListener("click",function(){
//     console.log("HI!")
//     mainPageSection.hidden=false
//     aboutUsSection.hidden=true
// })
>>>>>>> 2d04ca6003e978d64bf2a09ab7b5912544e56bd0

var mapSection=document.querySelector("#map")
=======
    $('#randomized').empty()
})
>>>>>>> 73884be4e2e25a6d6a6c5096ddccf77f3bf97fb0

$('#form').submit( function(e) {
    e.preventDefault();
    var input = $('#search').val();
    var inputArr = input.split(',')
    console.log(inputArr)
    var inputAbbr = inputArr[1].trim()
    //limit format to abbreviated state
    if (inputAbbr.length != 2) {
        window.alert("Please enter state in abbreviation format!" + "EX: GA")
        return 
    }
    if (input === null) {
        input.val() = "Atlanta, GA"
    }
    $('#block').addClass('hide')
    $('#randomizer').removeClass('hide')
    //get latitude and longitude of desired city
function getLocation(city,state) {
    var key = 'b5d6abd64c1bcaf907e06b633fed6528';
    var city = inputArr[0];
    var state = inputArr[1];
    var country = '';
    fetch('https://api.openweathermap.org/geo/1.0/direct?q='+ city +','+ state +','+country + '&limit=5&appid=' + key)
    .then(function(resp) { return resp.json() })
    .then(function(data) {
        console.log(data)
        console.log(data[0].lat)
        console.log(data[0].lon)
        let map
        function initMap() {
            map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: data[0].lat, lng: data[0].lon},
                zoom:12,
            });
        }
        window.initMap = initMap();
        //get restaurants with desired city
        function getRestaurants (){
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '3b327d0059msha07f2e8b5e08905p13aff9jsna9d2b3f3d9f3',
                    'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
                }
            };
            var state = inputArr[1].trim();
            var city = inputArr[0].trim();
            fetch('https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/'+ state +'/city/'+ city + '/2', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                console.log(parseFloat(response.restaurants[0].latitude))
                //creating 10 nearest restaurants
                const restaurants = [
                    [{ lat: parseFloat(response.restaurants[0].latitude), lng: parseFloat(response.restaurants[0].longitude) }, response.restaurants[0].restaurantName, response.restaurants[0].address, response.restaurants[0].cuisineType, response.restaurants[0].phone],
                    [{ lat: parseFloat(response.restaurants[1].latitude), lng: parseFloat(response.restaurants[1].longitude) }, response.restaurants[1].restaurantName, response.restaurants[1].address, response.restaurants[1].cuisineType, response.restaurants[1].phone],
                    [{ lat: parseFloat(response.restaurants[2].latitude), lng: parseFloat(response.restaurants[2].longitude) }, response.restaurants[2].restaurantName, response.restaurants[2].address, response.restaurants[2].cuisineType, response.restaurants[2].phone],
                    [{ lat: parseFloat(response.restaurants[3].latitude), lng: parseFloat(response.restaurants[3].longitude) }, response.restaurants[3].restaurantName, response.restaurants[3].address, response.restaurants[3].cuisineType, response.restaurants[3].phone],
                    [{ lat: parseFloat(response.restaurants[4].latitude), lng: parseFloat(response.restaurants[4].longitude) }, response.restaurants[4].restaurantName, response.restaurants[4].address, response.restaurants[4].cuisineType, response.restaurants[4].phone],
                    [{ lat: parseFloat(response.restaurants[5].latitude), lng: parseFloat(response.restaurants[5].longitude) }, response.restaurants[5].restaurantName, response.restaurants[5].address, response.restaurants[5].cuisineType, response.restaurants[5].phone],
                    [{ lat: parseFloat(response.restaurants[6].latitude), lng: parseFloat(response.restaurants[6].longitude) }, response.restaurants[6].restaurantName, response.restaurants[6].address, response.restaurants[6].cuisineType, response.restaurants[6].phone],
                    [{ lat: parseFloat(response.restaurants[7].latitude), lng: parseFloat(response.restaurants[7].longitude) }, response.restaurants[7].restaurantName, response.restaurants[7].address, response.restaurants[7].cuisineType, response.restaurants[7].phone],
                    [{ lat: parseFloat(response.restaurants[8].latitude), lng: parseFloat(response.restaurants[8].longitude) }, response.restaurants[8].restaurantName, response.restaurants[8].address, response.restaurants[8].cuisineType, response.restaurants[8].phone],
                    [{ lat: parseFloat(response.restaurants[9].latitude), lng: parseFloat(response.restaurants[9].longitude) }, response.restaurants[9].restaurantName, response.restaurants[9].address, response.restaurants[9].cuisineType, response.restaurants[9].phone],
                ];
                //randomizing restaurants
                    var random = document.getElementById('random')
                    function randomR(){
                        $('#map').addClass('hide')
                        $('#randomized').empty()
                        var rnd = Math.floor(Math.random()*7) + 0
                        console.log(rnd)
                        $('#randomized').append(`<h1>${restaurants[rnd][1]}</h1><br />
                                                <h1><a link='address'>${restaurants[rnd][2]}</a></h1><br />
                                                <h1>${restaurants[rnd][3]}</h1><br />
                                                <h1><a>${restaurants[rnd][4]}</a></h1>`) 
                    }
                    random.addEventListener("click", randomR)
                const infoWindow = new google.maps.InfoWindow();
                restaurants.forEach(([position, title, address], i) => {
                    const marker = new google.maps.Marker( {

                        position,
                        map,
                        title: `${i + 1}. ${title} <br />   ${address}`,
                        label: `${i + 1}`,
                        optimized: false,
                    })
                    marker.addListener("click", (e) => {
                        e.target
                        infoWindow.close();
                        infoWindow.setContent(marker.getTitle());
                        infoWindow.open(marker.getMap(), marker);
                    })
                });
            })
            .catch(err => console.error(err));
        }
        getRestaurants();
    })
    .catch(function() {
    })
}
getLocation()
});
