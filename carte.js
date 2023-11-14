var zoom_min = 19;
var zoom_max = 22;

var map = L.map('map', {minZoom : zoom_min}).setView([35.70754798478091, 139.76373632159613],19);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: zoom_max,
    maxNativeZoom : 25,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.addEventListener("click", function(e) {
    let lat = e.latlng.lat;
    let lng = e.latlng.lng;
    console.log(lat +', '+ lng)
  });

