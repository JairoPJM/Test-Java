$('#form').submit( function(e) {
    e.preventDefault();
    var input = $('#search').val();
    var inputArr = input.split(',')
    console.log(inputArr)
    var inputAbbr = inputArr[1].trim()
    if (inputAbbr.length != 2) {
        window.alert("Please enter state in abbreviation format!" + "EX: GA")
        return 
    }
    if (input === null) {
        input.val() = "Atlanta, GA"
    }
    $('#block').addClass('hide')
function getLocation(city,state) {
    var key = 'b5d6abd64c1bcaf907e06b633fed6528';
    var city = inputArr[0];
    var state = inputArr[1];
    var country = '';
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+ city +','+ state +','+country + '&limit=5&appid=' + key)
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
            fetch('https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/'+ state +'/city/'+ city + '/4', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                console.log(parseFloat(response.restaurants[0].latitude))
                const restaurants = [
                    [{ lat: parseFloat(response.restaurants[0].latitude), lng: parseFloat(response.restaurants[0].longitude) }, response.restaurants[0].restaurantName, response.restaurants[0].address],
                    [{ lat: parseFloat(response.restaurants[1].latitude), lng: parseFloat(response.restaurants[1].longitude) }, response.restaurants[1].restaurantName, response.restaurants[1].address],
                    [{ lat: parseFloat(response.restaurants[2].latitude), lng: parseFloat(response.restaurants[2].longitude) }, response.restaurants[2].restaurantName, response.restaurants[2].address],
                    [{ lat: parseFloat(response.restaurants[3].latitude), lng: parseFloat(response.restaurants[3].longitude) }, response.restaurants[3].restaurantName, response.restaurants[3].address],
                    [{ lat: parseFloat(response.restaurants[4].latitude), lng: parseFloat(response.restaurants[4].longitude) }, response.restaurants[4].restaurantName, response.restaurants[4].address],
                    [{ lat: parseFloat(response.restaurants[5].latitude), lng: parseFloat(response.restaurants[5].longitude) }, response.restaurants[5].restaurantName, response.restaurants[5].address],
                    [{ lat: parseFloat(response.restaurants[6].latitude), lng: parseFloat(response.restaurants[6].longitude) }, response.restaurants[6].restaurantName, response.restaurants[6].address],
                    [{ lat: parseFloat(response.restaurants[7].latitude), lng: parseFloat(response.restaurants[7].longitude) }, response.restaurants[7].restaurantName, response.restaurants[7].address],
                    [{ lat: parseFloat(response.restaurants[8].latitude), lng: parseFloat(response.restaurants[8].longitude) }, response.restaurants[8].restaurantName, response.restaurants[8].address],
                    [{ lat: parseFloat(response.restaurants[9].latitude), lng: parseFloat(response.restaurants[9].longitude) }, response.restaurants[9].restaurantName, response.restaurants[9].address],
                ];
                    var random = document.getElementById('random')
                    function randomR(){
                        $('#randomized').empty()
                        var rnd = Math.floor(Math.random()*7) + 0
                        console.log(rnd)
                        $('#randomized').append(`<h1>${restaurants[rnd][1]}</h1><br /><h1>${restaurants[rnd][2]}</h1><br/>`) 
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
