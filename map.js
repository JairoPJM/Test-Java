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
                .then(response => {
                    console.log(response)
                    let crimeData;
                    response = crimeData;
                    
                    for(let i = 0; i < (crimeData.incidents.length); i++){
                    
                    var myLatlng = new google.maps.LatLng(crimeData.incidents[i].incident_latitude,crimeData.incidents[i].incident_longitude);
                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        title: crimeData.incidents[i].incident_offense
                    })
                    marker.setMap(map);
                }
                    
                    // getMarker();
                    })
                    .catch(err => console.error(err));
                }
                getCrime();
            })
            .catch(function() {
            })
        }
        getLocation()
});