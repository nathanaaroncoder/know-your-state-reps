var coordinates = null;
var latitude = null;
var longitude = null;

var lastLatitude;
var lastLongitude;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.217052, lng: -74.742938 },
        zoom: 8
    });

    infoWindow = new google.maps.InfoWindow;

};

// Actual function call for geolocation.
$("#location-search").click(function() {

    navigator.geolocation.getCurrentPosition(success);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {


            var pos = {
                lat: latitude,
                lng: longitude
            };

            var marker = new google.maps.Marker({
                position: pos,
                map: map
            });

            $("#search").val(latitude + ", " + longitude);
            
            var geocoder = new google.maps.Geocoder;

            var latlng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};

            geocoder.geocode({ 'location': latlng }, function(results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        map.setZoom(11);
                        $("#search").val(results[0].formatted_address);
                    }
                }
            });

            map.setCenter(pos);

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
});


        lastLatitude = localStorage.getItem("latitude");
        lastLongitude = localStorage.getItem("longitude");

        if (lastLatitude ==null && lastLongitude ==null) {
            console.log("init Map");
        // Try HTML5 geolocation.
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: latitude,
                lng: longitude
              };

               var marker = new google.maps.Marker({
            position: pos,
            map: map
            });

              
              map.setCenter(pos);
            }, function() {
              handleLocationError(true, infoWindow, map.getCenter());
            });
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
          }
        }
        


// Function if the request for a user's geolocation is successful
function success(response) {


    coordinates = response.coords;
    latitude = coordinates.latitude;
    longitude = coordinates.longitude;

    if (lastLatitude ==null && lastLongitude ==null){
      latitude = coordinates.latitude;
      longitude = coordinates.longitude;
    } else { 
      latitude = lastLatitude;
      longitude = lastLongitude;
    }    


    var url = "https://openstates.org/api/v1/legislators/geo/?lat=" + latitude + "&long=" + longitude + "&apikey=8cef81cb-a1a4-48d3-86ff-0520d28f6ca6"



    $.getJSON(url, function(data) {
        // console.log(data)
        $("#names").append(data[0].full_name)
    });


  // console.log(url);
};

// Actual function call for geolocation.
// navigator.geolocation.getCurrentPosition(success);

var lastLatitude = localStorage.getItem("latitude");
var lastLongitude = localStorage.getItem("longitude");

// console.log (lastLatitude);
// console.log (lastLongitude);

if (lastLatitude ==null && lastLongitude ==null) {
    // console.log("success");
    navigator.geolocation.getCurrentPosition(success);
} else {

    var url = "https://openstates.org/api/v1/legislators/geo/?lat=" + lastLatitude + "&long=" + lastLongitude + "&apikey=8cef81cb-a1a4-48d3-86ff-0520d28f6ca6"

// console.log("localdata");

    $.getJSON(url, function(data){
        // console.log(data)
        $("#names").append(data[0].full_name)
    });

};