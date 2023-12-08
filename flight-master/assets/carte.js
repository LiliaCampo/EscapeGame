console.log("coucou");

/************************carte*********************/

var zoom_min = 17;
var zoom_max = 25;
var zoom_actuel = 19;
var map = L.map('map', {minZoom : zoom_min}).setView([35.707529564411864, 139.76302385330203],zoom_actuel);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: zoom_max,
    maxNativeZoom : 25,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


let tracker = Vue.createApp({
    data() {
        return{
            mouse : {
                lon : 0,
                lat : 0
            },
        };
    },
    methods :{
        track(){
            map.addEventListener("mousemove", function(e) {
            tracker.mouse.lon = e.latlng.lng;
            tracker.mouse.lat = e.latlng.lat;
            });
        },
    },
}).mount('#tracker');

/**********************objets**********************/

var dictionnaire_icon = L.icon({iconUrl : '../images/dictionnary.png',iconSize: [60, 60]});
var dictionnaire = L.marker([35.707385818127044, 139.7617853432894], {icon : dictionnaire_icon});
var indications_icon = L.icon({iconUrl : '../images/jap_man.png',iconSize: [40, 50]});
var indications = L.marker([35.707570945870046, 139.76315528154376], {icon : indications_icon}).addTo(map);
var alliance_icon = L.icon({iconUrl : '../images/wedd_ring.png',iconSize: [60, 60]});
var alliance = L.marker([35.71060480162236, 139.76841241121295], {icon : alliance_icon}).addTo(map);
var coord_icon = L.icon({iconUrl : '../images/coord_paper.png',iconSize: [70, 70]});
var coord_hotel = L.marker([35.711701088466086, 139.7685139998794], {icon : coord_icon}).addTo(map);
var couteau_icon = L.icon({iconUrl : '../images/knife.png',iconSize: [50, 50]});
var couteau = L.marker([35.713119133684295, 139.75828103721142], {icon : couteau_icon}).addTo(map);
var mari_icon = L.icon({iconUrl : '../images/dead_man.png',iconSize: [150, 225]});
var mari = L.marker([35.71327920324335, 139.75836485624316], {icon : mari_icon}).addTo(map);
var journal_icon = L.icon({iconUrl : '../images/diary.png',iconSize: [100, 60]});
var journal = L.marker([35.7133227595303, 139.7581543028355], {icon : journal_icon}).addTo(map);

/**********************fonctions**********************/

function objetVisible(objet, minZoomVisible){
    if (zoom_actuel >= minZoomVisible){
        objet.addTo(map);
    }
    else {
        map.removeLayer(objet);
    }
}

map.addEventListener('zoomend',function(){
    zoom_actuel = map.getZoom();
    console.log(zoom_actuel);
    objetVisible(dictionnaire,20);
    objetVisible(couteau,20);
    objetVisible(coord_hotel,21);
    objetVisible(mari,21);
    objetVisible(journal,23);
})

