var zoom_min = 16;
var zoom_max = 22;

var map = L.map('map', {minZoom : zoom_min}).setView([35.707529564411864, 139.76302385330203],19);

var livre = L.marker([35.707385818127044, 139.7617853432894]).addTo(map);
var monsieur_indic = L.marker([35.707570945870046, 139.76315528154376]).addTo(map);
var alliance = L.marker([35.71060480162236, 139.76841241121295]).addTo(map);
var coord_hotel = L.marker([35.711701088466086, 139.7685139998794]).addTo(map);
var couteau = L.marker([35.713119133684295, 139.75828103721142]).addTo(map);
var mari = L.marker([35.71327920324335, 139.75836485624316]).addTo(map);
var journal = L.marker([35.7133227595303, 139.7581543028355]).addTo(map);


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

